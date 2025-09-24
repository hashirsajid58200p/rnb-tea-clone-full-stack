const drinksData = [
    {
      id: "1",
      name: "Assam Black Tea (Cheese Cream)",
      category: "Cheese Cream",
      image: "assam black tea_cheese cream.png",
      price: 5.99,
      description: "A rich and robust black tea topped with a creamy cheese foam, offering a perfect balance of bold tea flavors and a velvety finish."
    },
    {
      id: "2",
      name: "Jasmine Green Tea (Cheese Cream)",
      category: "Cheese Cream",
      image: "jasmine green tea_cheese cream.png",
      price: 5.99,
      description: "Fragrant jasmine green tea paired with a luscious cheese cream topping, creating a refreshing and indulgent drink."
    },
    {
      id: "3",
      name: "Classic (Milk Tea)",
      category: "MilkTea",
      image: "classic_milktea.png",
      price: 4.99,
      description: "A timeless blend of black tea and creamy milk, perfectly sweetened for a smooth and satisfying milk tea experience."
    },
    {
      id: "4",
      name: "Honey Black (Milk Tea)",
      category: "MilkTea",
      image: "honey black_milktea.png",
      price: 5.49,
      description: "Bold black tea mixed with creamy milk and a touch of natural honey, delivering a subtly sweet and comforting flavor."
    },
    {
      id: "5",
      name: "Honey Green (Milk Tea)",
      category: "MilkTea",
      image: "honey green_milktea.png",
      price: 5.49,
      description: "Smooth green tea combined with creamy milk and a hint of honey, offering a refreshing and lightly sweet taste."
    },
    {
      id: "6",
      name: "House (Milk Tea)",
      category: "MilkTea",
      image: "house_milktea.png",
      price: 5.49,
      description: "Our signature milk tea blend, crafted with premium tea leaves and creamy milk for a rich and balanced flavor."
    },
    {
      id: "7",
      name: "Oreo (Milk Tea)",
      category: "MilkTea",
      image: "oreo_milktea.png",
      price: 5.99,
      description: "Classic milk tea infused with the chocolatey goodness of Oreo cookies, topped with crushed Oreo bits for extra crunch."
    },
    {
      id: "8",
      name: "Candy (Milk Tea)",
      category: "MilkTea",
      image: "candy_milktea.png",
      price: 5.99,
      description: "A fun and sweet milk tea with a candy-inspired twist, blending creamy tea with playful, sugary notes."
    },
    {
      id: "9",
      name: "Caramel (Coffee)",
      category: "Coffee",
      image: "caramel_coffee.png",
      price: 5.49,
      description: "Rich coffee blended with sweet caramel and creamy milk, delivering a smooth and indulgent coffee experience."
    },
    {
      id: "10",
      name: "Coconut (Coffee)",
      category: "Coffee",
      image: "coconut_coffee.png",
      price: 5.49,
      description: "A tropical twist on coffee, combining robust coffee with creamy coconut milk for a refreshing and unique flavor."
    },
    {
      id: "11",
      name: "Hazelnut (Coffee)",
      category: "Coffee",
      image: "hazelnut_coffee.png",
      price: 5.49,
      description: "Smooth coffee infused with the nutty sweetness of hazelnut, perfectly balanced with creamy milk."
    },
    {
      id: "12",
      name: "Vietnamese (Coffee)",
      category: "Coffee",
      image: "vietnamese_coffee.png",
      price: 5.99,
      description: "Traditional Vietnamese coffee made with strong brewed coffee and sweetened condensed milk, served over ice."
    },
    {
      id: "13",
      name: "Coconut Slush (Blended)",
      category: "Blended",
      image: "coconut slush_blended.png",
      price: 5.99,
      description: "A refreshing blended coconut slush, delivering a creamy and tropical taste perfect for a hot day."
    },
    {
      id: "14",
      name: "Dragon Fruit Mango Slush (Blended)",
      category: "Blended",
      image: "dragon fruit mango slush_blended.png",
      price: 6.49,
      description: "A vibrant blend of dragon fruit and mango in a slushy form, offering a sweet and tangy tropical refreshment."
    },
    {
      id: "15",
      name: "Honeydew Slush (Blended)",
      category: "Blended",
      image: "honeydew slush_blended.png",
      price: 5.99,
      description: "A cool and refreshing honeydew slush, capturing the sweet and juicy essence of ripe honeydew melon."
    },
    {
      id: "16",
      name: "Mangonada (Blended)",
      category: "Blended",
      image: "mangonada_blended.jpg",
      price: 6.49,
      description: "A spicy-sweet mango slush with a hint of chamoy and chili, topped with fresh mango chunks for a bold flavor."
    },
    {
      id: "17",
      name: "Mango Slush (Blended)",
      category: "Blended",
      image: "mango slush_blended.png",
      price: 5.99,
      description: "A refreshing mango slush, blending the juicy sweetness of mangoes into a cool and icy treat."
    },
    {
      id: "18",
      name: "Thai Tea (Blended)",
      category: "Blended",
      image: "thai tea_blended.png",
      price: 5.99,
      description: "A blended version of Thai tea, combining spiced tea with creamy milk in a refreshing, slushy form."
    },
    {
      id: "19",
      name: "Watermelonada (Blended)",
      category: "Blended",
      image: "watermelonada_blended.jpg",
      price: 6.49,
      description: "A sweet and tangy watermelon slush with a hint of lime, offering a refreshing and summery drink."
    },
    {
      id: "20",
      name: "Coconut (Stormy)",
      category: "Stormy",
      image: "coconut_stormy.png",
      price: 5.99,
      description: "A tropical stormy drink with coconut flavors, featuring a creamy texture and a refreshing finish."
    },
    {
      id: "21",
      name: "Dragon Fruit (Stormy)",
      category: "Stormy",
      image: "dragon fruit_stormy.png",
      price: 6.49,
      description: "A vibrant stormy drink with dragon fruit, offering a sweet and slightly tart taste with a creamy topping."
    },
    {
      id: "22",
      name: "Honeydew (Stormy)",
      category: "Stormy",
      image: "honeydew_stormy.png",
      price: 5.99,
      description: "A refreshing stormy drink with honeydew melon, topped with a creamy layer for a sweet and juicy experience."
    },
    {
      id: "23",
      name: "Matcha (Stormy)",
      category: "Stormy",
      image: "matcha_stormy.png",
      price: 6.49,
      description: "A bold matcha stormy drink, combining earthy green tea flavors with a creamy topping for a balanced taste."
    },
    {
      id: "24",
      name: "Oreo Chocolate (Stormy)",
      category: "Stormy",
      image: "oreo chocolate_stormy.png",
      price: 6.49,
      description: "A rich stormy drink with Oreo and chocolate flavors, topped with a creamy layer and Oreo crumbs."
    },
    {
      id: "25",
      name: "Taro (Stormy)",
      category: "Stormy",
      image: "taro_stormy.png",
      price: 5.99,
      description: "A nutty and creamy taro stormy drink, featuring a smooth taro base with a velvety topping."
    },
    {
      id: "26",
      name: "Thai Tea (Stormy)",
      category: "Stormy",
      image: "thai tea_stormy.png",
      price: 5.99,
      description: "A spiced Thai tea stormy drink, blending aromatic tea with creamy milk and a rich topping."
    },
    {
      id: "27",
      name: "Watermelon (Stormy)",
      category: "Stormy",
      image: "watermelon_stormy.png",
      price: 5.99,
      description: "A refreshing watermelon stormy drink, combining juicy watermelon flavors with a creamy topping."
    },
    {
      id: "28",
      name: "Lychee (Yakult)",
      category: "Yakult",
      image: "lychee_yakult.png",
      price: 5.99,
      description: "A refreshing lychee drink mixed with Yakult, offering a sweet and tangy probiotic refreshment."
    },
    {
      id: "29",
      name: "Mango (Yakult)",
      category: "Yakult",
      image: "mango_yakult.png",
      price: 5.99,
      description: "A tropical mango drink blended with Yakult, delivering a sweet and probiotic-packed refreshment."
    },
    {
      id: "30",
      name: "Peach (Yakult)",
      category: "Yakult",
      image: "peach_yakult.png",
      price: 5.99,
      description: "A juicy peach drink mixed with Yakult, combining fruity sweetness with a tangy probiotic twist."
    },
    {
      id: "31",
      name: "Strawberry (Yakult)",
      category: "Yakult",
      image: "strawberry_yakult.png",
      price: 5.99,
      description: "A sweet strawberry drink with Yakult, offering a refreshing blend of fruit and probiotic goodness."
    }
  ];
  
  export default drinksData;