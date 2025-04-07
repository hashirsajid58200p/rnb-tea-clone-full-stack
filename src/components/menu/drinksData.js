import assamBlackTea from "../../assets/drinksMenu/assam black tea_cheese cream.png";
import candyMilkTea from "../../assets/drinksMenu/candy_milktea.png";
import caramelCoffee from "../../assets/drinksMenu/caramel_coffee.png";
import classicMilkTea from "../../assets/drinksMenu/classic_milktea.png";
import coconutCoffee from "../../assets/drinksMenu/coconut_coffee.png";
import coconutSlush from "../../assets/drinksMenu/coconut slush_blended.png";
import coconutStormy from "../../assets/drinksMenu/coconut_stormy.png";
import dragonFruitMangoSlush from "../../assets/drinksMenu/dragon fruit mango slush_blended.png";
import dragonFruitStormy from "../../assets/drinksMenu/dragon fruit_stormy.png";
import hazelnutCoffee from "../../assets/drinksMenu/hazelnut_coffee.png";
import honeyBlackMilkTea from "../../assets/drinksMenu/honey black_milktea.png";
import honeydewSlush from "../../assets/drinksMenu/honeydew slush_blended.png";
import honeydewStormy from "../../assets/drinksMenu/honeydew_stormy.png";
import honeyGreenMilkTea from "../../assets/drinksMenu/honey green_milktea.png";
import houseMilkTea from "../../assets/drinksMenu/house_milktea.png";
import jasmineGreenTea from "../../assets/drinksMenu/jasmine green tea_cheese cream.png";
import lycheeYakult from "../../assets/drinksMenu/lychee_yakult.png";
import mangonadaBlended from "../../assets/drinksMenu/mangonada_blended.jpg";
import mangoSlush from "../../assets/drinksMenu/mango slush_blended.png";
import mangoYakult from "../../assets/drinksMenu/mango_yakult.png";
import matchaStormy from "../../assets/drinksMenu/matcha_stormy.png";
import oreoChocolateStormy from "../../assets/drinksMenu/oreo chocolate_stormy.png";
import oreoMilkTea from "../../assets/drinksMenu/oreo_milktea.png";
import peachYakult from "../../assets/drinksMenu/peach_yakult.png";
import strawberryYakult from "../../assets/drinksMenu/strawberry_yakult.png";
import taroStormy from "../../assets/drinksMenu/taro_stormy.png";
import thaiTeaBlended from "../../assets/drinksMenu/thai tea_blended.png";
import thaiTeaStormy from "../../assets/drinksMenu/thai tea_stormy.png";
import vietnameseCoffee from "../../assets/drinksMenu/vietnamese_coffee.png";
import watermelonadaBlended from "../../assets/drinksMenu/watermelonada_blended.jpg";
import watermelonStormy from "../../assets/drinksMenu/watermelon_stormy.png";

const drinksData = [
  {
    name: "Assam Black Tea (Cheese Cream)",
    category: "Cheese Cream",
    image: assamBlackTea,
    description:
      "A smooth and aromatic black tea with a rich layer of creamy cheese foam on top.",
  },
  {
    name: "Candy (Milk Tea)",
    category: "MilkTea",
    image: candyMilkTea,
    description:
      "A sweet and creamy milk tea with a hint of candy flavor, perfect for those with a sweet tooth.",
  },
  {
    name: "Caramel (Coffee)",
    category: "Coffee",
    image: caramelCoffee,
    description:
      "A rich and velvety coffee with a sweet caramel twist, ideal for caramel lovers.",
  },
  {
    name: "Classic (Milk Tea)",
    category: "MilkTea",
    image: classicMilkTea,
    description:
      "A timeless milk tea made with perfectly brewed tea and fresh milk, a classic favorite.",
  },
  {
    name: "Coconut (Coffee)",
    category: "Coffee",
    image: coconutCoffee,
    description:
      "A refreshing coffee blend infused with coconut for a tropical twist.",
  },
  {
    name: "Coconut Slush (Blended)",
    category: "Blended",
    image: coconutSlush,
    description:
      "A delicious coconut slush with a refreshing and creamy texture, perfect for a hot day.",
  },
  {
    name: "Coconut (Stormy)",
    category: "Stormy",
    image: coconutStormy,
    description:
      "A storm of coconut flavor, with smooth coconut cream and a touch of sweetness.",
  },
  {
    name: "Dragon Fruit Mango Slush (Blended)",
    category: "Blended",
    image: dragonFruitMangoSlush,
    description:
      "A vibrant and fruity slush made with dragon fruit and mango, a perfect tropical treat.",
  },
  {
    name: "Dragon Fruit (Stormy)",
    category: "Stormy",
    image: dragonFruitStormy,
    description:
      "A tangy and smooth drink made with dragon fruit, topped with a storm of creamy foam.",
  },
  {
    name: "Hazelnut (Coffee)",
    category: "Coffee",
    image: hazelnutCoffee,
    description:
      "A rich coffee flavored with roasted hazelnuts, perfect for nutty coffee enthusiasts.",
  },
  {
    name: "Honey Black (Milk Tea)",
    category: "MilkTea",
    image: honeyBlackMilkTea,
    description:
      "A smooth black milk tea infused with natural honey for a sweet and aromatic finish.",
  },
  {
    name: "Honeydew Slush (Blended)",
    category: "Blended",
    image: honeydewSlush,
    description:
      "A refreshing slush made with honeydew melon, giving it a light and fruity flavor.",
  },
  {
    name: "Honeydew (Stormy)",
    category: "Stormy",
    image: honeydewStormy,
    description:
      "A smooth and creamy honeydew drink, topped with a stormy foam that adds extra richness.",
  },
  {
    name: "Honey Green (Milk Tea)",
    category: "MilkTea",
    image: honeyGreenMilkTea,
    description:
      "A green tea milk tea sweetened with honey, offering a refreshing yet sweet beverage.",
  },
  {
    name: "House (Milk Tea)",
    category: "MilkTea",
    image: houseMilkTea,
    description:
      "A signature milk tea made with a special blend of tea and fresh milk, a must-try for all milk tea lovers.",
  },
  {
    name: "Jasmine Green Tea (Cheese Cream)",
    category: "Cheese Cream",
    image: jasmineGreenTea,
    description:
      "A fragrant jasmine green tea topped with a velvety cheese cream foam for a unique flavor.",
  },
  {
    name: "Lychee (Yakult)",
    category: "Yakult",
    image: lycheeYakult,
    description:
      "A refreshing lychee drink mixed with Yakult, perfect for those who love tropical flavors.",
  },
  {
    name: "Mangonada (Blended)",
    category: "Blended",
    image: mangonadaBlended,
    description:
      "A sweet and tangy mangonada slush with a spicy twist, a perfect treat for mango lovers.",
  },
  {
    name: "Mango Slush (Blended)",
    category: "Blended",
    image: mangoSlush,
    description:
      "A refreshing mango slush made with ripe mangoes, perfect for a tropical experience.",
  },
  {
    name: "Mango (Yakult)",
    category: "Yakult",
    image: mangoYakult,
    description:
      "A delicious mix of mango and Yakult for a sweet, tangy, and refreshing drink.",
  },
  {
    name: "Matcha (Stormy)",
    category: "Stormy",
    image: matchaStormy,
    description:
      "A matcha drink with a creamy stormy foam, offering a perfect balance of bitterness and creaminess.",
  },
  {
    name: "Oreo Chocolate (Stormy)",
    category: "Stormy",
    image: oreoChocolateStormy,
    description:
      "A rich and indulgent chocolate and Oreo drink, topped with a thick stormy foam.",
  },
  {
    name: "Oreo (Milk Tea)",
    category: "MilkTea",
    image: oreoMilkTea,
    description:
      "A creamy milk tea infused with crushed Oreos for a delicious, cookie-inspired drink.",
  },
  {
    name: "Peach (Yakult)",
    category: "Yakult",
    image: peachYakult,
    description:
      "A refreshing peach-flavored drink mixed with Yakult for a perfect balance of fruity and tangy.",
  },
  {
    name: "Strawberry (Yakult)",
    category: "Yakult",
    image: strawberryYakult,
    description:
      "A sweet strawberry drink blended with Yakult, offering a fruity and tangy combination.",
  },
  {
    name: "Taro (Stormy)",
    category: "Stormy",
    image: taroStormy,
    description:
      "A creamy taro drink with a stormy foam topping, combining sweetness with a touch of earthiness.",
  },
  {
    name: "Thai Tea (Blended)",
    category: "Blended",
    image: thaiTeaBlended,
    description:
      "A smooth and flavorful Thai tea slush, perfect for those who love a creamy tea-based drink.",
  },
  {
    name: "Thai Tea (Stormy)",
    category: "Stormy",
    image: thaiTeaStormy,
    description: "A bold and aromatic Thai tea topped with a rich stormy foam.",
  },
  {
    name: "Vietnamese (Coffee)",
    category: "Coffee",
    image: vietnameseCoffee,
    description:
      "A rich and strong Vietnamese coffee, perfect for those who enjoy an intense coffee experience.",
  },
  {
    name: "Watermelonada (Blended)",
    category: "Blended",
    image: watermelonadaBlended,
    description:
      "A refreshing watermelon slush with a hint of sweetness, perfect for a hot summer day.",
  },
  {
    name: "Watermelon (Stormy)",
    category: "Stormy",
    image: watermelonStormy,
    description:
      "A smooth and creamy watermelon drink, topped with a delicious stormy foam.",
  },
];

export default drinksData;
