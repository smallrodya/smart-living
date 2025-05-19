import requests
from bs4 import BeautifulSoup
import json
import time

def parse_premium_duvet_sets():
    base_url = "https://smart-living.co.uk/category/rugs/rugtype/reversible-rugs/"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    products = []
    page = 1
    max_pages = 1 # Мы знаем, что есть 3 страницы
    product_id = 1  # Начинаем с ID 1
    
    while page <= max_pages:
        url = f"{base_url}page/{page}/" if page > 1 else base_url
        print(f"\nПарсинг страницы {page}...")
        
        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, 'html.parser')
            
            product_elements = soup.select('div.product-grid-item')
            
            if not product_elements:
                print(f"На странице {page} товары не найдены")
                break
                
            for element in product_elements:
                try:
                    # Название товара
                    name_a = element.select_one('.product-element-bottom h3 a')
                    name = name_a.text.strip() if name_a else 'Unknown'
                    
                    # Цена товара (строкой, как на сайте)
                    price_element = element.select_one('.product-element-bottom span.price')
                    price_text = price_element.text.strip() if price_element else '£0.00'
                    
                    # Если цена задана через дефис, сохраняем её как строку
                    if '–' in price_text:
                        price = price_text
                    else:
                        price = price_text
                    
                    # Парсинг скидки и статуса
                    discount_element = element.select_one('.product-element-top.wd-quick-shop a div')
                    discount_text = discount_element.text.strip() if discount_element else ''
                    
                    # Разделяем скидку и статус
                    discount = ''
                    sold_out = False
                    
                    if discount_text:
                        if 'Sold out' in discount_text:
                            sold_out = True
                            # Удаляем "Sold out" из текста скидки
                            discount = discount_text.replace('Sold out', '').strip()
                        else:
                            discount = discount_text
                    
                    product = {
                        'id': product_id,
                        'name': name,
                        'price': price,
                        'discount': discount,
                        'sold_out': sold_out
                    }
                    
                    products.append(product)
                    print(f"Парсинг товара: ID {product_id} | {name} | {price} | Скидка: {discount} | Sold out: {sold_out}")
                    
                    product_id += 1  # Увеличиваем ID для следующего товара
                    
                except Exception as e:
                    print(f"Ошибка при парсинге товара: {str(e)}")
                    continue
                
                time.sleep(0.1)
            
            page += 1
            
        except Exception as e:
            print(f"Произошла ошибка при парсинге страницы {page}: {str(e)}")
            break
    
    # Сохраняем результаты в JSON файл
    with open('Reversible Rugs_products.json', 'w', encoding='utf-8') as f:
        json.dump(products, f, ensure_ascii=False, indent=2)
        
    print(f"\nВсего спарсено товаров: {len(products)}")
    print("Результаты сохранены в файл reversible_rugs_products.json")
    
    if len(products) != 10:
        print(f"\nВНИМАНИЕ: Спарсено {len(products)} товаров вместо ожидаемых 10!")
        print("Возможно, некоторые товары не были найдены или сайт изменился.")

if __name__ == "__main__":
    parse_premium_duvet_sets() 