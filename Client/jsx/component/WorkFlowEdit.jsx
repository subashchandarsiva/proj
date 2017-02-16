var React = require('react');
var ReactDOM = require('react-dom');
var yamlLint = require('yaml-lint');
var yaml = require('js-yaml');
import RaisedButton from 'material-ui/RaisedButton';
import Graph from './graph.jsx';
import Dialog from 'material-ui/Dialog';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/yaml';
import 'brace/theme/tomorrow';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import TransfuncEdit from './TransfuncEdit.jsx';


var doc;
var edge = new Array();
var node = new Array();
var x1 = 100,y1=100;

class WorkFlowEdit extends React.Component
{
	constructor(props)
	{
		super(props);

		this.handleVerify = this.handleVerify.bind(this);
		this.updateCode = this.updateCode.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleVisualise = this.handleVisualise.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.state={open:false,graph:'',jsonCode:'',templateName:this.props.filename,code:this.props.data ,err:[],isValid:false, isSubmit:false,buttonState:true}

	}

  componentWillReceiveProps(newProps)
  {
   this.setState({code:newProps.data,templateName:newProps.filename})
  }

	handleClose()
	{
		this.setState({open:false});
	}


	split()
	{
		var obj = doc.stages;

		var jsonArray=[];
		var incr =1;

		var array = Object.getOwnPropertyNames(obj);
		var json= {"nodes":[],"edges":[]};
		array.map(function(item){
		var temp = {
			id : incr,
			title:item,
			x:x1,
			y:y1,
			type:"empty"
		}
		x1+=100;
		y1+=70;
		incr++;
		json.nodes.push(temp);
		node.push(item);
		var props = Object.getOwnPropertyNames(item);
		edge.push(obj[item].depends_on);
	});


			for(var i in node)
			{
				if(edge[i]!=null)
				{
					if(edge[i].length<2)
					{

					//console.log(node[i] + " index "+(node.indexOf(node[i])+1) +" depends_on "+ (node.indexOf(edge[i].toString())+1));
					var temp = {
						source:node.indexOf(node[i])+1,
						target:(node.indexOf(edge[i].toString())+1),
						type:"emptyEdge"
					}
					json.edges.push(temp);
					}
					else
					{
						for(var k in edge[i])
						{
							//console.log("separate printing====>"+node.indexOf(edge[i][k]));
							//console.log(node[i] +" index "+node.indexOf(node[i])+" depends_on "+ edge[i][k]+" index "+node.indexOf(edge[i][k]));
							var temp = {
						source:(node.indexOf(node[i])+1),
						target:(node.indexOf(edge[i][k])+1),
						type:"emptyEdge"
								}
								json.edges.push(temp);
						}
					}
				}


			}

	var temp = <Graph data={json}/>
	this.setState({graph:temp});
	this.setState({open:true});

	}
	handleVisualise()
	{
		doc = yaml.safeLoad(this.state.code);
		console.log(doc);
		this.split();
	}


		handleVerify()
		{
			this.setState({buttonState:false});
			var that = this;
			yamlLint.lint(this.state.code).then(function () {
				that.setState({
					isValid: true
				});
				that.setState({err:[]	})
				alert('Valid File');
			}).catch(function (error) {
				var errtext=error.message;
				var startindex=error.message.indexOf("at line") + 8;
				var endindex=error.message.indexOf("column")-2;

				var errrow=error.message.substring(startindex,endindex)-1;
				var myerror=[{ row: errrow, column: 2, type: 'error', text:errtext }];
				that.setState({isValid:false});
				that.setState({err:myerror})
				alert('Invalid file!!! correct the error.');
				console.log(error.message);
			});

		}

		updateCode(newCode)
		{
			this.setState({code:newCode});
		}

    handleSubmit()
		{	if(this.state.isValid)
			{
				this.setState({
					isSubmit:true
				});
				alert('File Submitted');
				/*request.post('/saveFile').send({ data:this.state.code,fileName:this.props.filename}).set('Accept', 'application/json')
        .end(function(err, res){
          if (err || !res.ok) {
            alert('Oh no! error');
          } else
          {
            console.log(res.text);
						alert("File uploaded");
           }
          });*/


			}

			else{
				alert("Yaml is Still Not Verified");
			}

		}


		render () {

			const actions = [
				<FlatButton
					label="Cancel"
					primary={true}
					onTouchTap={this.handleClose}
					/>,
				<FlatButton
					label="Submit"
					primary={true}
					keyboardFocused={true}
					onTouchTap={this.handleClose}
					/>,
			];
			var myerr=[{ row: 1, column: 2, type: 'error', text: 'Some error.'}];

			var box=null;

			if(this.state.isSubmit)
			{
				box= <TransfuncEdit fileName={this.props.filename} content={this.state.code} transfunction={this.props.transfunction}/>;
			}
			else
			{
				box= <div className="container" style={{width:"auto"}}>
					<div className="row" >
						<AceEditor
							mode="yaml"
							theme="tomorrow"
							value={this.state.code}
							onChange={this.updateCode}
							name="UNIQUE_ID_OF_DIV"
							annotations={this.state.err}
							editorProps={{$blockScrolling: true}}
							style={{width:"60%",border:"1px solid black",margin:"10px"}}
							/>
					</div>

					<div className="row" style={{textAlign:"left"}}>
						<RaisedButton label="Verify" secondary={true}  onClick={this.handleVerify} style={{marginLeft:"1%"}}/>
						<RaisedButton label="Submit" secondary={true} onClick={this.handleSubmit} style={{marginLeft:"1%"}} />
						<RaisedButton label="Visualise" secondary={true} disabled={this.state.buttonState}onClick={this.handleVisualise} style={{marginLeft:"1%"}} />

						<Dialog
							title="Dialog With Actions"
							actions={actions}
							modal={false}
							open={this.state.open}
							onRequestClose={this.handleClose}>
							{this.state.graph}
						</Dialog>
					</div>

				</div>
			}


			return (
				<div>
					{box}
				</div>

			);
		} //end of render
	} //end of class TemplateEditor

	export default WorkFlowEdit;
