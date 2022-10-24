import { useEffect , useReducer } from 'react' ;
import axios from "axios" ;

const initialState = {
    loading: true ,
    data: [],
    error: null
}

const reduce = ( state , action ) => {
    // Atualiza o estado de 'error', 'data' e de 'loading'
    // De acordo com o tipo de ação
    switch ( action.type ) {
        case 'OnFetching' :
            return {
                loading: true ,
                data: [],
                error: null
            }
        case 'OnSuccess' :
            return {
                loading: false ,
                data: action.payload ,
                error: null
            }
        case 'OnFailure' :
            return {
                loading: false ,
                data: [],
                error: 'Lamento, ocorreu um erro!'
            }
        default :
            return state ;
    }
}

// O hook é apenas uma simples função que podemos exportar
export function useFindBooksReducer ( search ) {
    
    // Definimos os estados necessários para o nosso hook, isso inclui:
    // usuários (data), estado de carregamento (loading) e erros (error)
    
    const [ state , dispatch ] = useReducer ( reduce , initialState )
    
    // A cada renderização do componente, o hook useEffect executa a função listUsers().
    
    useEffect (() => {
    
    // Ao mover a função listUsers para dentro do useEffect, podemos ver claramente os valores que ela usa.
    
    async function listBook () {
    try {
        // Altera a apiUrl de acordo com a string 'search'
        const apiUrl = search ?
                `https://fakerestapi.azurewebsites.net/api/v1/Books${search}` :
                'https://fakerestapi.azurewebsites.net/api/v1/Books';
            
            const result = await axios.get (apiUrl);

        // Atualiza o estado de 'data' com o resultado da API
        
        if ( result.data ) {
            //Caso esteja sendo feito uma pesquisa, retorna apenas 1 registro
            
            if ( search !== '' ) {
                //Adiciona a resposta em um array
                let res = [];
                res.push ( result.data );
                //Atualiza o estado em caso de sucesso
                dispatch ({ type: 'OnSuccess' , payload: res });
            } else {
                //Senão, atualiza o estado em caso de sucesso com o array vindo da API
                dispatch ({ type: 'OnSuccess' , payload: result.data });
            }
            } else {
                //Atualiza o estado em caso de erro
                dispatch ({ type: 'OnFailure' });
            }
        }
    catch ( err ) {
        //Atualiza o estado em caso de erro
        dispatch ({ type: 'OnFailure' });
    }
    };
    
    // Primeiro, definimos os estados em caso de pesquisa
    dispatch ({ type: 'OnFetching' });
    
    // executa a função listUsers().
    listBook ();
    
    //Passamos o novo parâmetro search atualizar o useEffect.
    }, [ search ]);
    return { state };
    }