import prismaClient from "../../prisma";

interface ItemRequest{
  order_id: string;
  product_id: string;
  quantity: number;
  name: string;
  price: string;
}

class AddItemService{
  async execute({ order_id, product_id, quantity, name, price }: ItemRequest){

    const order = await prismaClient.item.create({
      data:{
        order_id: order_id,
        product_id: product_id,
        quantity,
        name: name,
        price: price
      }
    })

    return order;

  }
}

export { AddItemService }