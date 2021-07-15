import { SiteClient } from 'datocms-client';

export default async function recebedorRequest(request, response) {

    if(request.method === 'POST') {
        const TOKEN = 'ee675b578cb3885a8f7ea7ee622395';
        const client = new SiteClient(TOKEN);
    
        const registroCriado = await client.items.create({
            itemType: "968784", //id do model do Dato
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