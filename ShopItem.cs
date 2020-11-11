using System;

namespace job
{
    public class ShopItemAttr {
        public string Color { get; set; }

        public string Format { get; set; }
    }
    
    public class ShopItem
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int Price { get; set; }

        public ShopItemAttr Attr { get; set; }
    }
}
