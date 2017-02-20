import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
const data1={
	"status": "failed",
	"stdout": [],
	"stderr": "",
	"exitCode": 0,
	"initialized": "6:8:2",
	"scheduled": "2017-02-16T06:08:44.653Z",
	"completed": "2017-02-16T06:08:51.570Z"
};
class Mocha extends React.Component {

  constructor(props) {
    super(props);
		this.state({data:this.props.res});
  }

  render() {
    if(data.status==='Complete')
    var avatar="../jsx/images/avatar1.jpeg";
  else
    var avatar="../jsx/images/avatar2.jpeg";
    return (
      <Card >
        <CardHeader
          title="Mocha"
          avatar={avatar}
          subtitle={data.status}
          actAsExpander={true}
          showExpandableButton={true}
        />
      <CardTitle title="Report" expandable={true} />
        <CardText expandable={true}>
        Status = {data.status}<br/>
        Initialized@= {data.initialized}<br />
        scheduled@= {data.scheduled}<br />
        completed@={data.completed}

        <br/>
        <div>
          <Table showCheckbox={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
          <TableRow>
            <TableHeaderColumn>filePath</TableHeaderColumn>
            <TableHeaderColumn>messages</TableHeaderColumn>
            <TableHeaderColumn>errorCount</TableHeaderColumn>
            <TableHeaderColumn>warningCount</TableHeaderColumn>
          </TableRow>
          </TableHeader>
           <TableBody showRowHover={true} displayRowCheckbox={false}>
          {data.stdout.map((tile) => (
     <TableRow>
       <TableRowColumn> {tile[Object.keys(tile)[0]]}</TableRowColumn>
       <TableRowColumn> {tile[Object.keys(tile)[1]]}</TableRowColumn>
       <TableRowColumn> {tile[Object.keys(tile)[2]]}</TableRowColumn>
       <TableRowColumn> {tile[Object.keys(tile)[3]]}</TableRowColumn>
     </TableRow>

   ))}
     </TableBody>
 </Table>

        </div>
        </CardText>
      </Card>
    );

  }
}

export default Mocha;
