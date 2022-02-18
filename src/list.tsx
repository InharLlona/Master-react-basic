import React, {useState, useEffect} from 'react'
import { Link, generatePath } from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from "material-ui-flat-pagination";

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

export const ListPage = () => {
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(5);
  const [sliced, setSliced] = React.useState<MemberEntity[]>([]);
  const [Corpname, setCorpname] = React.useState("apple");
  const [members, setMembers] = React.useState<MemberEntity[]>([]);

  const classes = useStyles();

  interface MemberEntity {
    id: string;
    login: string;
    avatar_url: string;
  }
  
const getCorp =  (props: string) => {
    return (fetch(`https://api.github.com/orgs/${props}/members`)
        .then((response) => response.json()))
  }

React.useEffect(() => {
                const slice = members.slice(offset, offset + perPage)
                ajustsliced(slice)
}, [members, offset])

const ajustsliced = dato => {
  setSliced(dato)
}

const handleClick = (e,off,np) => {
  setOffset((np-1)*perPage)
};

React.useEffect(() => {
     getCorp(Corpname).then(data => setMembers(data));
}, [])

const clickSearch = () => {
  setOffset(0)
  getCorp(Corpname).then(json => setMembers(json));
  console.log("hola")
}

return (
  <div>
     <input value={Corpname} onChange={(e) => setCorpname(e.target.value)}/>
      <button onClick = {clickSearch}>Search</button>
      <h2 className={classes.title}>Hello from {Corpname} List page</h2>
    <div>
      {sliced.map( pd => (
            <div key={pd.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={pd.avatar_url} />
              </ListItemAvatar>
              <ListItemText
                primary= {`id:${pd.id}`}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                    Name:
                    </Typography>
                    {<Link to={generatePath("/detail/:id", { id: pd.login })}>
                      {pd.login}
                    </Link>}
                  </React.Fragment>}
                  />
              </ListItem>
              <img src={pd.login} alt=""/>
            </div>))}
    </div>
    <div>
      <Pagination 
        limit={perPage}
        offset={offset}
        total={members.length}
        onClick={(e,off,np)=>handleClick(e,off,np)}
        nextPageLabel={'next'}
        previousPageLabel={'prev'}
        innerButtonCount={2}
        outerButtonCount={2}/>
    </div> 
  </div>
);
}
