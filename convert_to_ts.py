import json

def convert_json_to_ts():
    try:
        # Читаем JSON файл
        with open('premium_duvet_products.json', 'r', encoding='utf-8') as f:
            products = json.load(f)
        
        # Формируем TypeScript код
        ts_code = "const products: Product[] = [\n"
        
        for i, product in enumerate(products):
            ts_code += "  {\n"
            ts_code += f"    id: {i + 101},\n"  # Начинаем с id 101
            ts_code += f"    name: '{product['name']}',\n"
            ts_code += f"    price: '{product['price']}',\n"
            ts_code += f"    image: '{product['image']}',\n"
            ts_code += f"    hoverImage: '{product['hoverImage']}',\n"
            ts_code += f"    discount: '{product['discount']}',\n"
            if product.get('isSoldOut'):
                ts_code += "    isSoldOut: true,\n"
            ts_code += f"    color: '{product['color']}',\n"
            ts_code += "    sizes: {\n"
            ts_code += "      single: true,\n"
            ts_code += "      double: true,\n"
            ts_code += "      king: true,\n"
            ts_code += "      superKing: true\n"
            ts_code += "    }\n"
            ts_code += "  },\n"
        
        ts_code += "];"
        
        # Сохраняем в файл
        with open('products.ts', 'w', encoding='utf-8') as f:
            f.write(ts_code)
            
        print("Конвертация завершена. Результат сохранен в файл products.ts")
        
    except Exception as e:
        print(f"Произошла ошибка: {str(e)}")

if __name__ == "__main__":
    convert_json_to_ts() 