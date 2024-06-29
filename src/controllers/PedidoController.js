const Database = require("../database/Database");

class PedidoController extends Database {

    async criar(request, response) {
        const dados = request.body;

        /*


        Faça aqui as validações

        */

        let total = 0;

        for (let i = 0; i < dados.products.length; i++) {
            const item = dados.products[i];
            const produtoAtual = await this.database.query(`
                SELECT price FROM products 
                WHERE id = $1
            `, [item.product_id]);

            total = total + (produtoAtual.rows[0].price * item.amount);
        }

        // INSERIR o pedido 
        const meuPedido = await this.database.query(`
            INSERT INTO orders (client_id, address, observations, total)
            values ($1,$2,$3,$4)
            returning *
            `, [dados.client_id, dados.address, dados.observations, 1000])

        // INSERIR os items
        dados.products.forEach(async item => {
            const produtoAtual = await this.database.query(`
                SELECT price from products 
                where id = $1
                `, [item.product_id])

            this.database.query(`
                INSERT INTO orders_items (order_id, product_id, amount, price)
                values ($1,$2,$3,$4)
                returning *
                `, [
                meuPedido.rows[0].id,
                item.product_id,
                item.amount,
                produtoAtual.rows[0].price
            ])
        })
      
        response.status(201).json({mensagem: 'criado com sucesso'})

    }
}

module.exports = new PedidoController()