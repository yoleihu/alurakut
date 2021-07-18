import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AluraCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRations'

//SIDEBAR
function ProfileSidebar(properties) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${properties.githubUser}.png`} style={{ borderRadius: '8px' }}/>
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${properties.githubUser}`}>
          @{properties.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

// cria um box com map com os dados que pegamos da api do git
function ProfileRelationsBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})
      </h2>
      <ul>
      {propriedades.items.slice(0,6).map((itemAtual, index)=>{
        return(
          <li key={index}>
            <a href={`https://github.com/${itemAtual.login}`}>
              <img src={`https://github.com/${itemAtual.login}.png`}></img>
              <span>{itemAtual.login}</span>
            </a>
          </li>
        )
      })
      }
    </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home(props) {
  const usuarioAleatorio = props.githubUser;
  //const githubUser = "yoleihu";
  const [comunidades, setComunidades] = React.useState([]);
  const [depoimentos, setDepoimentos] = React.useState([]);
  //const comunidades = ['Alurakut'] ;
  const pessoasFavoritas = [ 
  'omariosouto', 
  'peas', 
  'leonrc99', 
  'juunegreiros',
  'rafaballerini'];

  const [seguidores, setSeguidores] = React.useState([]);

  //Pega o array de dados da api do github
  React.useEffect(function() { 
    const linkUsuario = "https://api.github.com/users/" + usuarioAleatorio + "/followers";
    //dentro do useEffect para não fazer loop infinito
    //GET
    fetch(linkUsuario)
    .then(function (respostaDoServidor) {
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta) {
      setSeguidores(respostaCompleta);
    })

    //api GraphQL (back para criar comunidades)
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '51df4a4e505706a411ce29ba92f472',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id 
          title
          imageUrl
          creatorSlug
        }
      }` })
    })
    .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
    .then((respostaCompleta) => {
      const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
      console.log(comunidadesVindasDoDato)
      setComunidades(comunidadesVindasDoDato)
    })

  }, [])

    //api GraphQL (back para criar depoimentos)
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '51df4a4e505706a411ce29ba92f472',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allBriefs{
          id 
          title
          texto  
        }
      }` })
    })
    .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
    .then((respostaCompleta) => {
      const depoimentosVindasDoDato = respostaCompleta.data.allBriefs;
      console.log(depoimentosVindasDoDato)
      setDepoimentos(depoimentosVindasDoDato)
    })

  

  return (
    <>
      <AlurakutMenu />
      <MainGrid> 
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={usuarioAleatorio}/>
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a)!
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle"> O que você deseja fazer?</h2>

            <h2 className="Titulinho">
              Crie uma comunidade:
            </h2>

            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              console.log('Campo: ', dadosDoForm.get('title'));
              console.log('Campo: ', dadosDoForm.get('image'));
              
              const comunidade = {
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: usuarioAleatorio,
              }

              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response) => {
                const dados = await response.json();
                console.log(dados.registroCriado);
                const comunidade = dados.registroCriado;
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas)
              })

            }}>
            <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title"
                  arial-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input 
                  placeholder="Coloque uma URL para usarmos de capa" 
                  name="image"
                  arial-label="Coloque uma URL para usarmos de capa"
                />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          
          
            <h2 className="Titulinho">
              Crie um depoimento:
            </h2>

            <form onSubmit={function handleCriaDepoimento(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              console.log('Campo: ', dadosDoForm.get('title'));
              console.log('Campo: ', dadosDoForm.get('texto'));
              
              const depoimento = {
                title: dadosDoForm.get('title'),
                texto: dadosDoForm.get('texto'),
              }

              fetch('/api/depoimentos', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(depoimento)
              })
              .then(async (response) => {
                const dados = await response.json();
                console.log(dados.registroCriado);
                const depoimento = dados.registroCriado;
                const depoimentosAtualizadas = [...depoimentos, depoimento];
                setDepoimentos(depoimentosAtualizadas)
              })

            }}>
            <div>
                <input 
                  placeholder="Insira o título" 
                  name="title"
                  arial-label="Insira o título"
                  type="text"
                />
              </div>
              <div>
                <textarea
                  placeholder="Escreva seu depoimento" 
                  name="texto"
                  arial-label="Escreva seu depoimento"
                  type="text" 
                />
              </div>
              <button>
                Criar depoimento
              </button>
            </form>


          </Box>


          <Box>
          <h2 className="smallTitle">
              Depoimentos ({depoimentos.length})
            </h2>
            <ol>
              {depoimentos.map((itemAtual) => {
                return (
                  <li className="caixinha" key={itemAtual.id}>
                    <p href={`/briefs/${itemAtual.id}`}>
                      <h4 className="titleDep"> {itemAtual.title} </h4>
                      <pre className="textDep"> {itemAtual.texto} </pre>
                    </p>
                  </li>
                )
              })}
            </ol>
          </Box>

        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

          <ProfileRelationsBox title="Seguidores" items={seguidores} />

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/communities/${itemAtual.id}`}>
                      <img src={itemAtual.imageUrl} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
            Pessoas Favoritas ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.slice(0,6).map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>


        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch("https://alurakut-yoleihu.vercel.app/api/auth", {
    headers: {
        Authorization: token
      }
  })
  .then((resposta) => resposta.json())

  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
}