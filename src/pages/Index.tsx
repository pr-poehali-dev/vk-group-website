import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<Array<{ id: number; name: string; price: number; image: string }>>([]);
  const [activeSection, setActiveSection] = useState('home');

  const products = [
    {
      id: 1,
      name: 'Вечернее платье',
      price: 45000,
      category: 'Платья',
      image: 'https://cdn.poehali.dev/projects/f1f154c6-01ae-4b0f-a578-78bc15251e66/files/fcb3f57f-ec27-4a4b-95f4-315225b9112c.jpg'
    },
    {
      id: 2,
      name: 'Коктейльное платье',
      price: 38000,
      category: 'Платья',
      image: 'https://cdn.poehali.dev/projects/f1f154c6-01ae-4b0f-a578-78bc15251e66/files/015facd7-11b4-4ae5-b5a3-420be7b3ccbf.jpg'
    },
    {
      id: 3,
      name: 'Деловой костюм',
      price: 52000,
      category: 'Костюмы',
      image: 'https://cdn.poehali.dev/projects/f1f154c6-01ae-4b0f-a578-78bc15251e66/files/093a24fc-2dfb-4864-b0b8-7f5e2fb8ebc3.jpg'
    },
    {
      id: 4,
      name: 'Свадебное платье',
      price: 95000,
      category: 'Платья',
      image: 'https://cdn.poehali.dev/projects/f1f154c6-01ae-4b0f-a578-78bc15251e66/files/fcb3f57f-ec27-4a4b-95f4-315225b9112c.jpg'
    }
  ];

  const testimonials = [
    {
      name: 'Анна Петрова',
      text: 'Невероятное качество! Платье село идеально, ткань премиум-класса. Кристина — настоящий мастер своего дела.',
      rating: 5
    },
    {
      name: 'Елена Волкова',
      text: 'Заказывала вечернее платье для торжества. Результат превзошёл все ожидания! Внимание к деталям на высшем уровне.',
      rating: 5
    },
    {
      name: 'Мария Соколова',
      text: 'Индивидуальный подход, профессионализм и безупречный вкус. Рекомендую всем, кто ценит эксклюзивность.',
      rating: 5
    }
  ];

  const addToCart = (product: typeof products[0]) => {
    setCart([...cart, product]);
    setCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-primary">Kristina Yars</h1>
            
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('home')} className={`text-sm hover:text-accent transition-colors ${activeSection === 'home' ? 'text-accent' : ''}`}>
                Главная
              </button>
              <button onClick={() => scrollToSection('catalog')} className={`text-sm hover:text-accent transition-colors ${activeSection === 'catalog' ? 'text-accent' : ''}`}>
                Каталог
              </button>
              <button onClick={() => scrollToSection('gallery')} className={`text-sm hover:text-accent transition-colors ${activeSection === 'gallery' ? 'text-accent' : ''}`}>
                Галерея
              </button>
              <button onClick={() => scrollToSection('about')} className={`text-sm hover:text-accent transition-colors ${activeSection === 'about' ? 'text-accent' : ''}`}>
                О мастере
              </button>
              <button onClick={() => scrollToSection('testimonials')} className={`text-sm hover:text-accent transition-colors ${activeSection === 'testimonials' ? 'text-accent' : ''}`}>
                Отзывы
              </button>
              <button onClick={() => scrollToSection('contacts')} className={`text-sm hover:text-accent transition-colors ${activeSection === 'contacts' ? 'text-accent' : ''}`}>
                Контакты
              </button>
            </div>

            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingBag" size={20} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="font-serif text-2xl">Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map((item, index) => (
                        <div key={index} className="flex gap-4 items-center">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.price.toLocaleString('ru-RU')} ₽</p>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => removeFromCart(index)}>
                            <Icon name="X" size={16} />
                          </Button>
                        </div>
                      ))}
                      <Separator />
                      <div className="flex justify-between items-center font-semibold text-lg">
                        <span>Итого:</span>
                        <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
                      </div>
                      <Button className="w-full" size="lg">
                        Оформить заказ
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="relative h-[90vh] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://cdn.poehali.dev/projects/f1f154c6-01ae-4b0f-a578-78bc15251e66/files/fcb3f57f-ec27-4a4b-95f4-315225b9112c.jpg')` 
            }}
          />
          <div className="relative z-10 text-center text-white px-4 animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6">Эксклюзивная одежда</h2>
            <p className="text-xl md:text-2xl mb-8 font-light">Индивидуальное производство • Премиум качество</p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary font-semibold" onClick={() => scrollToSection('catalog')}>
              Смотреть коллекцию
            </Button>
          </div>
        </section>

        <section id="catalog" className="py-20 px-4 bg-secondary/30">
          <div className="container mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12">Каталог</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-shadow animate-scale-in">
                  <div className="relative overflow-hidden aspect-[3/4]">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4">{product.category}</Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-serif text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-2xl font-bold text-accent mb-4">{product.price.toLocaleString('ru-RU')} ₽</p>
                    <Button className="w-full" onClick={() => addToCart(product)}>
                      <Icon name="ShoppingBag" size={16} className="mr-2" />
                      В корзину
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="py-20 px-4">
          <div className="container mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12">Галерея работ</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                'https://cdn.poehali.dev/projects/f1f154c6-01ae-4b0f-a578-78bc15251e66/files/fcb3f57f-ec27-4a4b-95f4-315225b9112c.jpg',
                'https://cdn.poehali.dev/projects/f1f154c6-01ae-4b0f-a578-78bc15251e66/files/093a24fc-2dfb-4864-b0b8-7f5e2fb8ebc3.jpg',
                'https://cdn.poehali.dev/projects/f1f154c6-01ae-4b0f-a578-78bc15251e66/files/015facd7-11b4-4ae5-b5a3-420be7b3ccbf.jpg'
              ].map((img, idx) => (
                <div key={idx} className="relative aspect-square overflow-hidden rounded-lg group animate-fade-in">
                  <img 
                    src={img} 
                    alt={`Работа ${idx + 1}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-20 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">О мастере</h2>
            <div className="prose prose-lg mx-auto">
              <p className="text-lg leading-relaxed mb-6">
                Кристина Ярс — дизайнер одежды с многолетним опытом создания эксклюзивных моделей для самых взыскательных клиентов.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Каждое изделие создаётся вручную с учётом индивидуальных особенностей фигуры и пожеланий клиента. 
                Мы используем только премиальные ткани от ведущих европейских производителей.
              </p>
              <p className="text-lg leading-relaxed">
                Философия бренда — элегантность, качество и внимание к деталям. Каждое платье — это произведение искусства, 
                которое подчёркивает вашу индивидуальность.
              </p>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-20 px-4">
          <div className="container mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12">Отзывы клиентов</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, idx) => (
                <Card key={idx} className="animate-fade-in">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                    <p className="font-semibold">{testimonial.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="contacts" className="py-20 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12">Контакты</h2>
            <Card>
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <Icon name="Phone" size={24} className="text-accent" />
                  <div>
                    <p className="font-semibold">Телефон</p>
                    <p className="text-muted-foreground">+7 (999) 123-45-67</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-4">
                  <Icon name="Mail" size={24} className="text-accent" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-muted-foreground">info@kristinayars.ru</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-4">
                  <Icon name="MapPin" size={24} className="text-accent" />
                  <div>
                    <p className="font-semibold">Адрес ателье</p>
                    <p className="text-muted-foreground">г. Москва, ул. Тверская, д. 10</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="font-semibold mb-4">Записаться на консультацию</p>
                  <div className="space-y-3">
                    <input 
                      type="text" 
                      placeholder="Ваше имя" 
                      className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <input 
                      type="tel" 
                      placeholder="Телефон" 
                      className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <textarea 
                      placeholder="Ваше сообщение" 
                      rows={4}
                      className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <Button className="w-full" size="lg">
                      Отправить заявку
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground py-12 px-4">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-serif font-bold mb-4">Kristina Yars</h3>
          <p className="text-sm opacity-80 mb-4">Эксклюзивная одежда индивидуального пошива</p>
          <div className="flex justify-center gap-4">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-accent">
              <Icon name="Instagram" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-accent">
              <Icon name="Facebook" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-accent">
              <Icon name="Mail" size={20} />
            </Button>
          </div>
          <p className="text-xs opacity-60 mt-8">© 2024 Kristina Yars. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
