import { SiteClient } from 'datocms-client';

export default async function recebedorRequest(request, response) {

    if(request.method === 'POST') {
        const TOKEN = '194340fd0686a9dba2e4403d7a20b8';
        const client = new SiteClient(TOKEN);
    
        const registroCriado = await client.items.create({
            itemType: "976912", //id do model do Dato
            ...request.body,
            /*
            title: "Comunidade de teste",
            imageUrl: "https://github.com/yoleihu.png",
            creatorSlug: "yoleihu"
            */
        })
        
        console.log(registroCriado);

        response.json({
            dados: 'Algum dado aqui',
            registroCriado: registroCriado
        })
        return;
    }
    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}