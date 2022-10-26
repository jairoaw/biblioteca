import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//import Avatar from '@material-ui/core/Avatar';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link } from "react-router-dom";
import { useFindBooksReducer } from "../useFindBooksReducer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

function BookInfo () {
  //Cria um estado para o conteúdo da pesquisa
  const [ search , setSearch ] = useState ( '' );
      
  // use seu próprio hook para carregar os dados da API
  //const { state } = useFindUsers (search);
  const { state } = useFindBooksReducer ( search );

  // Desestruture isLoading, data e error de state
  const { data , loading , error } = state ;

  return (
      <div>
          { loading ? <p> Carregando... </p> :
          < ul >
              {
              data &&
              data.length > 0 &&
              data.map ( item => (
                  <li key = { item.id } >
                      { item.id } : { item.title } : { item.excerpt } : { item.publishDate}
                  </li>
              ))
              }
          </ul> }
      { error ? <p> { error } </p> : null}
      </div>
  );
}
export default BookInfo;