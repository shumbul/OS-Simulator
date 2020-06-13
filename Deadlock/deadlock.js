var num;
var index;
var alloc= [];
var need = [];
var p = [];
var r = [];
var visited =[];
var recStack = [];
var index;
var num; 
var g;
var q = [];
//exaple in  http://www.embeddedlinux.org.cn/rtconforembsys/5107final/LiB0100.html
function addInitials()
{
	num = parseInt(document.getElementById("totalres").value);
	if(isNaN(num)||num<=0)
		window.alert("Enter valid input"); 
	else
	{
		index = parseInt(document.getElementById("totalpros").value);
		if(isNaN(index))
		{
			var d1=document.getElementById("allocated");
			d1.innerHTML="";
			var d2=document.getElementById("need");
			d2.innerHTML="";
		//window.alert("Enter valid input"); 
		}
		else
		{	
			var d1=document.getElementById("allocated");
			d1.innerHTML="";
			var p = document.createElement("h5");
			p.setAttribute("style","text-align:center");
			p.textContent = "Enter allocation matrix ( if allocated(enter 1) else (enter 0)) ";
			d1.appendChild(p);
			var br=document.createElement("br");
			for(var i=0;i<index;i++)
			{
				var card =document.createElement("card");
				card.setAttribute("style","width:100%;float:left;height:50px;text-align:center;");
				var p1=document.createElement("p");
				p1.setAttribute("style","margin-left:10px;float:left;margin-right:20px;");
				p1.textContent = "Process "+(i+1)+": ";
				card.appendChild(p1);
				for(var j=0;j<num;j++)
				{
					var inp1 = document.createElement("input");
					inp1.setAttribute("id","AR"+i+","+j);
					inp1.setAttribute("placeholder","R-"+(j+1));
					inp1.setAttribute("style","width:50px;text-align:center;margin-right:50px;float:left;");
					card.appendChild(inp1);
				}
				d1.appendChild(card);
				d1.appendChild(br);
				d1.appendChild(br);
			}
			var d2=document.getElementById("need");
			d2.innerHTML="";
			var c=document.createElement("card");
			c.setAttribute("style","width:100%;height:50px;");
			d1.appendChild(c);
			var p2 = document.createElement("h5");
			p2.setAttribute("style","text-align:center");
			p2.textContent = "Enter need matrix ( if need(enter 1) else (enter 0)) ";
			d2.appendChild(p2);
			var br=document.createElement("br");
			for(var i=0;i<index;i++)
			{
				var card1 =document.createElement("card");
			    card1.setAttribute("style","width:100%;float:left;height:50px;text-align:center;");
				var p3=document.createElement("p");
				p3.setAttribute("style","margin-left:10px;float:left;margin-right:20px");
				p3.textContent = "Process "+(i+1)+": ";
				card1.appendChild(p3);
				for(var j=0;j<num;j++)
				{
					var inp1 = document.createElement("input");
					inp1.setAttribute("id","NR"+i+","+j);
					inp1.setAttribute("placeholder","R-"+(j+1));
					inp1.setAttribute("style","width:50px;text-align:center;margin-right:50px;float:left;");
					card1.appendChild(inp1);
				}
				d2.appendChild(card1);
				d2.appendChild(br);
			}
		}
	}
}	


class Graph 
{
    constructor(V)
    {
        this.V = V;
        this.AdjList = new Map();
    }
    addVertex(v)
	{
		//console.log(v);
		 this.AdjList.set(v, []);
	}
	addEdge(v, w)
	{
		this.AdjList.get(v).push(w); // Add w to v’s list.
	}

	isCyclicUtil(v)
	{
		if(visited[v] == false)
		{
			visited[v] = true;
			recStack[v] = true;
			// Recur for all the vertices adjacent to this vertex
			var get_neighbours = this.AdjList.get(v)
			for(var i in get_neighbours)
			{
				var get_elem = get_neighbours[i];
				q.push(get_elem);
				if ( !visited[get_elem] && g.isCyclicUtil(get_elem) )
				    return true;
				else if (recStack[get_elem])
					return true;
			}
		}
		recStack[v] = false;  // remove the vertex from recursion stack
		return false;
	}


	// Returns true if the graph contains a cycle, else false.
	isCyclic()
	{
		for(var i = 0; i < 40; i++)
		{
			visited[i] = false;
			recStack[i] = false;
		}
		// Call the recursive helper function to detect cycle in different
		// DFS trees
		for(var i = 0; i < p.length; i++)
		{
			if (g.isCyclicUtil(p[i]))
            return true;
		}
		for(var i = 0; i < r.length; i++)
		{
			if (g.isCyclicUtil(r[i]))
				return true;
		}
		return false;
	}
};
 
function createGraph()
{
	g=new Graph(40);
	for(var i=0;i<p.length;i++)
		g.addVertex(p[i]);
	for(var i=0;i<r.length;i++)
		g.addVertex(r[i]);
	
	for(var i=0;i<index;i++)
	{
		for(var j=0;j<num;j++)
		{
			if(alloc[i][j]!=0)
			{
				g.addEdge(20+j,i);
			}
		}
	}
	for(var i=0;i<index;i++)
	{
		for(var j=0;j<num;j++)
		{
			if(need[i][j]!=0)
				g.addEdge(i,j+20);
		}
	}
	var div = document.getElementById("output");
	var div1 = document.getElementById("output1");
	div.innerHTML="";
	if(g.isCyclic())
	{
		var pp=document.createElement("h5");
		pp.setAttribute("style","margin-left:20px;");
		pp.textContent=" A cycle is found in the graph, and a deadlock exists";
		div.appendChild(pp);
		var card2=document.createElement("h5");
		card2.textContent="One present Cycle Is:"; 
		card2.setAttribute("style","float:left;margin-left:20px;widht:100%;");
		div1.appendChild(card2);
		var n=q.length-1;
		for(var i=0;i<q.length;i++)
		{
			var p6=document.createElement("h5");
			var p7=document.createElement("h5");
			p6.setAttribute("style","float:left;margin-left:10px;margin-right:10px;");
			p7.setAttribute("style","float:left;margin-left:10px;margin-right:10px;");
			if(q[i]<20)
			{
				if(i!=n)
					p6.textContent="P"+(q[i]+1)+"--(wants)-->";
				else if(i==n && q[n]!=q[0])
					p6.textContent="P"+(q[i]+1)+"--(wants)-->";
				else
					p6.textContent="P"+(q[i]+1);
					div1.appendChild(p6);
			}
			else if(q[i]>=20)
			{
				if(i!=n)
					p7.textContent="R"+(q[i]+1-20)+"--(allocated to)-->";
				else if(i==n && q[n]!=q[0])
					p7.textContent="R"+(q[i]+1-20)+"--(allocated to)-->";
				else 
					p7.textContent="R"+(q[i]+1-20);
				div1.appendChild(p7);
			}
		    console.log(q[i]);
		}
		var p8=document.createElement("h5");
		p8.setAttribute("style","float:left;margin-left:20px;margin-right:20px;");
		var l=q.length -1;
		if(q[l]!=q[0]&&q[l]<20 )
			{
				console.log(q[0]);
				p8.textContent="R"+(q[0]+1-20);
				div1.appendChild(p8);
			}
			else if(q[l]!=q[0]&&q[l]>=20)
			{
				console.log(q[0]);
				p8.textContent="R"+(q[0]+1);
				div1.appendChild(p8);
			}
	    console.log("Graph contains cycle");
	}
    else
	{
		var p1=document.createElement("h5");
		p1.setAttribute("style","margin-left:20px;");
		p1.textContent=" No Deadlock";
		div.appendChild(p1);
		console.log("Graph doesn't contain cycle");
	}
		
}

function clear_data()
{
	var a=3;
	console.log(a);
	alloc= [];
	max=[];
	need=[];
	p=[];
	r=[];
	q=[];
	visited =[];
	recStack = [];
	//index =0;
	//num =0;
	var clr1=document.getElementById("output");
	var clr2=document.getElementById("output1");
	clr1.innerHTML="";
	clr2.innerHTML="";
	var clr3=document.getElementById("allocated");
	var clr4=document.getElementById("need");
	clr3.innerHTML="";
	clr4.innerHTML="";
	var clr5=document.getElementById("totalres");
	var clr6=document.getElementById("totalpros");
	clr5.value="";
	clr6.value="";
}

function cleardata()
{
	alloc= [];
	max=[];
	need=[];
	p=[];
	r=[];
	q=[];
	var clr1=document.getElementById("output");
	var clr2=document.getElementById("output1");
	clr1.innerHTML="";
	clr2.innerHTML="";
}

function detection()
{
	cleardata();
	for(var i=0;i<index;i++)
	{	
		var temp1 =[];
		for(var j=0;j<num;j++)
		{
			var inp1 = document.getElementById("AR"+i+","+j).value;
			if (isNaN(parseInt(inp1))||inp1<0||inp1>1){
				window.alert("Please enter valid inputs");
				return;
			}
			
			temp1.push(parseInt(inp1));
		}
	alloc.push(temp1);
	}
	for(var i=0;i<index;i++)
	{	
		var temp1 =[];
		for(var j=0;j<num;j++)
		{
			var inp1 = document.getElementById("NR"+i+","+j).value;
			if (isNaN(parseInt(inp1))||inp1<0||inp1>1){
				window.alert("Please enter valid inputs");
				return;
			}
			temp1.push(parseInt(inp1));
			
		}
	need.push(temp1);
	}
	
	for(var i=0;i<num;i++)
	{
		var c=0;
		for(var j=0;j<index;j++)
		{
			if(alloc[j][i]>0)
				c++;
			if(c>1)
			{
				window.alert("Resourse "+(j+1) +" can not be allocated to more than one process");
				return;
			}
		}
		
	}
	for(var i=0;i<index;i++)
		p.push(i);
	for(var i=0;i<num;i++)
		r.push(20+i);
	
	
	createGraph();
}