import React from "react";
import { Link, generatePath } from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from "react-paginate";
//import { App } from "./paginationb";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  title:{
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  }
}));

const regeneratorRuntime = require("regenerator-runtime");
require("regenerator-runtime/path").path

interface MemberEntity {
  id: string;
  login: string;
  avatar_url: string;
}

const getCorp = async (props: string) => {
  return fetch(`https://api.github.com/orgs/${props}/members`)
      .then((response) => response.json())
}

export const ListPage: React.FC = () => {
  const classes = useStyles();
  
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const [Corpname, setCorpname] = React.useState("apple");

  React.useEffect(() => {
      getCorp(Corpname).then(json => setMembers(json));
  }, []);

  const clickSearch = () => {
    getCorp(Corpname).then(json => setMembers(json));
    console.log("hola")
  }

  return (
    <>
      <input value={Corpname} onChange={(e) => setCorpname(e.target.value)}/>
      <button onClick = {clickSearch}>Search</button>
      <h2 className={classes.title}>Hello from List page</h2>
      {/* <table className="table">
        <tbody> */}
      
       //
       
        {/* </tbody>
      </table> */}
    </>
  );
};
