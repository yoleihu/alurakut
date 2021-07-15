import styled from 'styled-components'
import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AluraCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRations'

//Pega o array de dados da api do github
function ProfileSidebar(properties) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${properties.githubUser}.png`} style={{ borderRadius: '8px' }}/>
      <hr />
      <p></p>
      <a className="boxLink" href={`https://github.com/${properties.githubUser}`}>
        @{properties.githubUser}
      </a>
      <p/>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

//cria um box com map com os dados que pegamos da api do git
function ProfileRelationsBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smalTitle">
      {propriedades.title} ({propriedades.items.length})
      </h2>
      <ul>
        {/*seguidores.map((itemAtual) => {
          return (
            <li key={itemAtual}>
              <a href={`https://github.com/${itemAtual}.png`}>
                <img src={itemAtual.image} />
                <span>{itemAtual.title}</span>
              </a>
            </li>
          )
        })*/}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const usuarioAleatorio = 'yoleihu';
  const [comunidades, setComunidades] = React.useState([{
    id: '123498765',
    title: 'Eu Odeio Acordar Cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  //const comunidades = ['Alurakut'] ;
  const pessoasFavoritas = [ 
  'omariosouto', 
  'peas', 
  'leonrc99', 
  'juunegreiros',
  'rafaballerini'];

  const [seguidores, setSeguidores] = React.useState([]);
  React.useEffect(function() { //dentro do useEffect para não fazer loop infinito
    fetch('https://api.github.com/users/yoleihu/followers')
    .then(function (respostaDoServidor) {
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta) {
      setSeguidores(respostaCompleta);
    })
   }, [])

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
            <h2 className="subTitle"> Oque você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);
              
              const comunidade = {
                id: new Date().toISOString(),
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image')
              }
              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas);

            }}>
            <div>
                <input 
                  placeholder="Qual vai ser o nome dasua comunidade?" 
                  name="title"
                  arial-label="Qual vai ser o nome dasua comunidade?"
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
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          
          <ProfileRelationsBox title="Seguidores" items={seguidores}/>

          <ProfileRelationsBoxWrapper>
            <h2 className="smalTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`}>
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smalTitle">
            Pessoas da Comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
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