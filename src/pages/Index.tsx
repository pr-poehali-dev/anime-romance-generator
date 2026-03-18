import { useState } from "react";
import Icon from "@/components/ui/icon";

const BANNER_IMG = "https://cdn.poehali.dev/projects/dba79d1b-97bb-4b6a-979c-ab1ce0478951/files/a3a977b8-ced0-43f3-910b-5e6e9fc57912.jpg";

type Category = "games" | "accounts" | "services" | "browser";

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  category: Category;
  badge?: "sale" | "new" | "hot";
  rating: number;
  reviews: number;
  emoji: string;
  desc: string;
  platform?: string;
}

const PRODUCTS: Product[] = [
  { id: 1, name: "GTA V Premium", price: 799, oldPrice: 1499, category: "games", badge: "sale", rating: 5, reviews: 1204, emoji: "🚗", desc: "Grand Theft Auto V + Online. Steam ключ, моментальная активация.", platform: "Steam" },
  { id: 2, name: "Minecraft Java", price: 1299, oldPrice: 1699, category: "games", badge: "hot", rating: 5, reviews: 3401, emoji: "⛏️", desc: "Лицензионный Minecraft Java Edition. Официальная лицензия.", platform: "Mojang" },
  { id: 3, name: "PUBG: Battlegrounds", price: 399, category: "games", badge: "new", rating: 4, reviews: 876, emoji: "🪂", desc: "PlayerUnknown's Battlegrounds. Steam ключ + 300 G-Coin.", platform: "Steam" },
  { id: 4, name: "CS2 Prime Status", price: 599, oldPrice: 999, category: "games", badge: "sale", rating: 5, reviews: 2100, emoji: "🔫", desc: "CS2 Prime статус. Улучшенный дроп, матчмейкинг без читеров.", platform: "Steam" },
  { id: 5, name: "Cyberpunk 2077", price: 1099, oldPrice: 1999, category: "games", badge: "sale", rating: 5, reviews: 654, emoji: "🤖", desc: "Cyberpunk 2077 + DLC Phantom Liberty. Полное издание.", platform: "Steam" },
  { id: 6, name: "Red Dead Redemption 2", price: 899, oldPrice: 1599, category: "games", rating: 5, reviews: 789, emoji: "🤠", desc: "RDR2 полная версия + онлайн. Steam ключ.", platform: "Steam" },

  { id: 7, name: "Steam аккаунт с играми", price: 1999, oldPrice: 3500, category: "accounts", badge: "hot", rating: 5, reviews: 445, emoji: "🎮", desc: "Steam аккаунт с 20+ играми. GTA V, CS2, RDR2 и другие.", platform: "Steam" },
  { id: 8, name: "GTA Online аккаунт", price: 2499, oldPrice: 4000, category: "accounts", badge: "hot", rating: 4, reviews: 312, emoji: "💰", desc: "GTA Online. $500M в банке, 100 ранг, все машины разблокированы.", platform: "Rockstar" },
  { id: 9, name: "Minecraft премиум акк", price: 899, category: "accounts", badge: "new", rating: 5, reviews: 201, emoji: "💎", desc: "Minecraft аккаунт с ником на выбор. Java + Bedrock.", platform: "Mojang" },
  { id: 10, name: "CS2 Prime аккаунт", price: 1499, oldPrice: 2200, category: "accounts", badge: "sale", rating: 4, reviews: 567, emoji: "🏆", desc: "CS2 аккаунт с Prime. Уровень Steam 30+, без банов.", platform: "Steam" },
  { id: 11, name: "PUBG аккаунт 100 LVL", price: 1799, category: "accounts", rating: 4, reviews: 134, emoji: "🎖️", desc: "PUBG аккаунт 100 уровня с редкими скинами и наградами.", platform: "Steam" },
  { id: 12, name: "Epic Games аккаунт", price: 999, oldPrice: 1500, category: "accounts", badge: "sale", rating: 4, reviews: 289, emoji: "⚡", desc: "Epic Games аккаунт с 15+ играми включая GTA V, Fortnite скины.", platform: "Epic" },

  { id: 13, name: "Прокачка в GTA Online", price: 699, category: "services", badge: "hot", rating: 5, reviews: 890, emoji: "📈", desc: "Прокачаем до 100 ранга в GTA Online. 24-48 часов. Гарантия.", platform: "GTA" },
  { id: 14, name: "Донат CS2 скины", price: 499, category: "services", badge: "new", rating: 5, reviews: 1100, emoji: "🔪", desc: "Пополним Steam с бонусом +10%. Покупка скинов CS2 оптом.", platform: "Steam" },
  { id: 15, name: "Boost в PUBG", price: 799, oldPrice: 1200, category: "services", badge: "sale", rating: 4, reviews: 345, emoji: "🚀", desc: "Поднимем рейтинг в PUBG. Conqueror гарантирован за 7 дней.", platform: "PUBG" },
  { id: 16, name: "Minecraft сервер", price: 1299, category: "services", rating: 5, reviews: 178, emoji: "🏗️", desc: "Настройка приватного Minecraft сервера на 20 игроков. 1 месяц.", platform: "Minecraft" },
  { id: 17, name: "Помощь в прохождении", price: 299, category: "services", badge: "new", rating: 5, reviews: 412, emoji: "🗺️", desc: "Помощь в прохождении любой игры. Онлайн-помощник. 1 час.", platform: "Любая" },
  { id: 18, name: "VPN для игр", price: 199, category: "services", rating: 4, reviews: 677, emoji: "🛡️", desc: "VPN подписка на 3 месяца. Снижение пинга, доступ к зарубежным серверам.", platform: "Все" },

  { id: 19, name: "Slither.io Premium", price: 99, category: "browser", badge: "new", rating: 4, reviews: 234, emoji: "🐍", desc: "Премиум скины и бустеры для Slither.io. 30 дней.", platform: "Browser" },
  { id: 20, name: "Krunker.io аккаунт", price: 349, category: "browser", badge: "hot", rating: 5, reviews: 445, emoji: "🎯", desc: "Krunker.io аккаунт с редкими скинами и высоким KD.", platform: "Browser" },
  { id: 21, name: "Agar.io VIP", price: 149, category: "browser", rating: 4, reviews: 123, emoji: "🔵", desc: "Agar.io VIP статус. Уникальные скины, без рекламы.", platform: "Browser" },
  { id: 22, name: "Shell Shockers Premium", price: 249, oldPrice: 399, category: "browser", badge: "sale", rating: 4, reviews: 89, emoji: "🥚", desc: "Shell Shockers аккаунт с премиум скинами яиц.", platform: "Browser" },
];

const CATEGORIES = [
  { id: "all", label: "Все товары", icon: "LayoutGrid" },
  { id: "games", label: "Игры", icon: "Gamepad2" },
  { id: "accounts", label: "Аккаунты", icon: "User" },
  { id: "services", label: "Услуги", icon: "Wrench" },
  { id: "browser", label: "Браузерные", icon: "Globe" },
];

const NAV_LINKS = [
  { id: "catalog", label: "Каталог" },
  { id: "services", label: "Услуги" },
  { id: "about", label: "О нас" },
];

const STATS = [
  { value: "5000+", label: "Довольных клиентов" },
  { value: "22", label: "Товара в каталоге" },
  { value: "15 мин", label: "Среднее время доставки" },
  { value: "24/7", label: "Поддержка" },
];

const Stars = ({ n }: { n: number }) => (
  <span className="stars text-sm">{Array.from({ length: 5 }, (_, i) => i < n ? "★" : "☆").join("")}</span>
);

export default function Index() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Product[]>([]);
  const [modal, setModal] = useState<Product | null>(null);
  const [payStep, setPayStep] = useState<"details" | "waiting" | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = PRODUCTS.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const addToCart = (p: Product) => {
    if (!cart.find((c) => c.id === p.id)) setCart((prev) => [...prev, p]);
  };

  const removeFromCart = (id: number) => setCart((prev) => prev.filter((c) => c.id !== id));

  const totalPrice = cart.reduce((acc, p) => acc + p.price, 0);

  const handleBuy = (p: Product) => {
    setModal(p);
    setPayStep("details");
  };

  const handlePay = () => {
    setPayStep("waiting");
  };

  const closeModal = () => {
    setModal(null);
    setPayStep(null);
  };

  return (
    <div className="min-h-screen relative" style={{ background: "#080c14" }}>

      {/* NAV */}
      <nav className="nav-glass fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #00d4ff, #a855f7)" }}>
              <Icon name="Gamepad2" size={16} style={{ color: "#080c14" }} />
            </div>
            <span className="font-bold text-xl neon-cyan" style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.08em" }}>
              GAME<span style={{ color: "#a855f7" }}>STORE</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <a key={l.id} href={`#${l.id}`}
                className="text-sm font-medium transition-colors"
                style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.05em" }}>
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск игр..."
                className="text-sm px-4 py-2 pr-10 rounded-lg outline-none"
                style={{
                  background: "rgba(0,212,255,0.06)",
                  border: "1px solid rgba(0,212,255,0.2)",
                  color: "white",
                  width: "200px",
                }}
              />
              <Icon name="Search" size={14} className="absolute right-3 top-2.5" style={{ color: "rgba(0,212,255,0.5)" }} />
            </div>
            <button onClick={() => setCartOpen(true)}
              className="relative btn-outline px-3 py-2 rounded-lg flex items-center gap-2 text-sm">
              <Icon name="ShoppingCart" size={16} />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: "#00d4ff", color: "#080c14" }}>
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="catalog" className="relative pt-24 pb-10 px-6 hero-gradient">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center mb-14">
            <div className="fade-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs mb-5"
                style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.25)", color: "#00d4ff" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Онлайн — магазин работает
              </div>
              <h1 className="font-bold mb-4" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", lineHeight: 1.05, color: "#fff" }}>
                ИГРОВОЙ<br />
                <span className="neon-cyan">МАРКЕТ</span>{" "}
                <span style={{ color: "#a855f7" }}>PRO</span>
              </h1>
              <p className="mb-8 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.5)", maxWidth: "400px" }}>
                Игры, аккаунты, услуги по прокачке. GTA V, Minecraft, CS2, PUBG и многое другое. Мгновенная доставка, гарантия.
              </p>
              <div className="flex gap-3">
                <button className="btn-primary px-7 py-3 rounded-xl text-base">
                  Смотреть каталог
                </button>
                <button className="btn-outline px-6 py-3 rounded-xl text-base">
                  Все услуги
                </button>
              </div>
            </div>
            <div className="fade-up delay-2 float-slow">
              <img src={BANNER_IMG} alt="Gaming Store"
                className="rounded-2xl w-full object-cover"
                style={{ height: "280px", border: "1px solid rgba(0,212,255,0.2)", boxShadow: "0 20px 60px rgba(0,212,255,0.15)" }} />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {STATS.map((s) => (
              <div key={s.label} className="stat-card">
                <div className="font-bold text-2xl neon-cyan" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{s.value}</div>
                <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* CATALOG */}
      <section className="py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <h2 className="text-3xl font-bold text-white">КАТАЛОГ</h2>
            <div className="md:hidden relative">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск..."
                className="text-sm px-4 py-2 pr-9 rounded-lg outline-none"
                style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.2)", color: "white", width: "180px" }}
              />
              <Icon name="Search" size={13} className="absolute right-3 top-3" style={{ color: "rgba(0,212,255,0.5)" }} />
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 flex-wrap mb-8">
            {CATEGORIES.map((cat) => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className={`tab-filter flex items-center gap-2 ${activeCategory === cat.id ? "active" : ""}`}>
                <Icon name={cat.icon as "LayoutGrid"} size={14} />
                {cat.label}
              </button>
            ))}
          </div>

          {/* Products grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20" style={{ color: "rgba(255,255,255,0.3)" }}>
              <div className="text-5xl mb-4">🎮</div>
              <p className="text-lg">Ничего не найдено</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((p) => (
                <div key={p.id} className="game-card rounded-2xl flex flex-col">
                  {/* Card top */}
                  <div className="relative p-5 pb-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-4xl">{p.emoji}</div>
                      <div className="flex flex-col items-end gap-1">
                        {p.badge === "sale" && <span className="badge-sale">СКИДКА</span>}
                        {p.badge === "new" && <span className="badge-new">НОВЫЙ</span>}
                        {p.badge === "hot" && <span className="badge-hot">ХИТ</span>}
                      </div>
                    </div>
                    <h3 className="font-bold text-white mb-1" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "1.1rem" }}>
                      {p.name}
                    </h3>
                    {p.platform && (
                      <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(168,85,247,0.15)", color: "#a855f7", border: "1px solid rgba(168,85,247,0.25)" }}>
                        {p.platform}
                      </span>
                    )}
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-xs mb-4 leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                      {p.desc}
                    </p>

                    <div className="flex items-center gap-2 mb-4">
                      <Stars n={p.rating} />
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>({p.reviews})</span>
                    </div>

                    <div className="flex items-end justify-between mb-4">
                      <div>
                        {p.oldPrice && <div className="price-old">{p.oldPrice} ₽</div>}
                        <div className="price-new">{p.price} ₽</div>
                      </div>
                      {p.oldPrice && (
                        <span className="text-xs font-bold" style={{ color: "#22c55e" }}>
                          -{Math.round((1 - p.price / p.oldPrice) * 100)}%
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button onClick={() => handleBuy(p)} className="btn-primary flex-1 py-2.5 rounded-xl text-sm">
                        Купить
                      </button>
                      <button
                        onClick={() => addToCart(p)}
                        className="btn-outline px-3 py-2.5 rounded-xl"
                        title="В корзину"
                      >
                        <Icon name={cart.find((c) => c.id === p.id) ? "Check" : "ShoppingCart"} size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="divider" />

      {/* SERVICES section */}
      <section id="services" className="py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">УСЛУГИ ПО ИГРАМ</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem" }}>Прокачка, буст рейтинга, помощь в прохождении</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "TrendingUp", title: "Прокачка аккаунта", desc: "Поднимем уровень в GTA Online, PUBG, CS2. Гарантия безопасности.", price: "от 499 ₽", color: "#00d4ff" },
              { icon: "Shield", title: "Буст рейтинга", desc: "Улучшим ваш rank в CS2, PUBG. Быстро, безопасно, с гарантией.", price: "от 699 ₽", color: "#a855f7" },
              { icon: "Headphones", title: "Поддержка 24/7", desc: "Онлайн-помощник по любым вопросам. Помощь в прохождении игр.", price: "от 199 ₽", color: "#22c55e" },
            ].map((s) => (
              <div key={s.title} className="game-card rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `rgba(${s.color === "#00d4ff" ? "0,212,255" : s.color === "#a855f7" ? "168,85,247" : "34,197,94"},0.15)`, border: `1px solid ${s.color}30` }}>
                  <Icon name={s.icon as "TrendingUp"} size={22} style={{ color: s.color }} />
                </div>
                <h3 className="font-bold text-white text-xl mb-2">{s.title}</h3>
                <p className="text-sm mb-5 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{s.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold" style={{ color: s.color, fontFamily: "'Rajdhani', sans-serif", fontSize: "1.2rem" }}>{s.price}</span>
                  <button className="btn-outline px-4 py-2 rounded-xl text-sm">Заказать</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ABOUT */}
      <section id="about" className="py-14 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">ПОЧЕМУ МЫ?</h2>
          <p className="mb-12" style={{ color: "rgba(255,255,255,0.4)" }}>Тысячи довольных покупателей. Мгновенная доставка. Гарантия.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { icon: "Zap", label: "Мгновенно", desc: "Доставка за 15 минут" },
              { icon: "ShieldCheck", label: "Безопасно", desc: "100% гарантия" },
              { icon: "Headphones", label: "Поддержка", desc: "24 часа, 7 дней" },
              { icon: "Star", label: "Качество", desc: "5★ рейтинг" },
            ].map((f) => (
              <div key={f.label} className="game-card rounded-2xl p-5 text-center">
                <div className="w-10 h-10 rounded-xl mx-auto flex items-center justify-center mb-3"
                  style={{ background: "rgba(0,212,255,0.12)", border: "1px solid rgba(0,212,255,0.2)" }}>
                  <Icon name={f.icon as "Zap"} size={18} style={{ color: "#00d4ff" }} />
                </div>
                <div className="font-bold text-white mb-1">{f.label}</div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 text-center" style={{ borderTop: "1px solid rgba(0,212,255,0.1)" }}>
        <div className="font-bold text-xl neon-cyan mb-2" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
          GAME<span style={{ color: "#a855f7" }}>STORE</span>
        </div>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>© 2026 GameStore Pro · Все права защищены</p>
      </footer>

      {/* CART SIDEBAR */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setCartOpen(false)}>
          <div className="modal-overlay absolute inset-0" />
          <div className="relative w-full max-w-sm h-full modal-box flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "rgba(0,212,255,0.15)" }}>
              <h3 className="font-bold text-white text-xl">Корзина ({cart.length})</h3>
              <button onClick={() => setCartOpen(false)} className="btn-outline p-2 rounded-lg">
                <Icon name="X" size={16} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16" style={{ color: "rgba(255,255,255,0.3)" }}>
                  <div className="text-4xl mb-3">🛒</div>
                  <p>Корзина пуста</p>
                </div>
              ) : (
                cart.map((p) => (
                  <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.12)" }}>
                    <span className="text-2xl">{p.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white text-sm truncate">{p.name}</div>
                      <div className="price-new" style={{ fontSize: "1rem" }}>{p.price} ₽</div>
                    </div>
                    <button onClick={() => removeFromCart(p.id)} style={{ color: "rgba(255,80,80,0.7)" }}>
                      <Icon name="Trash2" size={15} />
                    </button>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-6 border-t" style={{ borderColor: "rgba(0,212,255,0.15)" }}>
                <div className="flex justify-between mb-4">
                  <span style={{ color: "rgba(255,255,255,0.5)" }}>Итого:</span>
                  <span className="price-new" style={{ fontSize: "1.5rem" }}>{totalPrice} ₽</span>
                </div>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    if (cart.length > 0) { setModal(cart[0]); setPayStep("details"); }
                  }}
                  className="btn-primary w-full py-3 rounded-xl text-base"
                >
                  Оплатить всё
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* BUY MODAL */}
      {modal && payStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={closeModal}>
          <div className="modal-overlay absolute inset-0" />
          <div className="modal-box relative rounded-2xl p-8 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-4 right-4 btn-outline p-1.5 rounded-lg">
              <Icon name="X" size={15} />
            </button>

            {payStep === "details" && (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl">{modal.emoji}</span>
                  <div>
                    <h3 className="font-bold text-white text-xl">{modal.name}</h3>
                    <div className="price-new">{modal.price} ₽</div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div>
                    <label className="text-xs mb-1 block" style={{ color: "rgba(255,255,255,0.45)" }}>Ваше имя</label>
                    <input placeholder="Введите имя" className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.2)", color: "white" }} />
                  </div>
                  <div>
                    <label className="text-xs mb-1 block" style={{ color: "rgba(255,255,255,0.45)" }}>Email или Telegram</label>
                    <input placeholder="Для получения товара" className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.2)", color: "white" }} />
                  </div>
                </div>

                <div className="rounded-xl p-4 mb-6" style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.15)" }}>
                  <div className="text-xs mb-2 font-semibold" style={{ color: "#00d4ff" }}>Способ оплаты — СБП / Карта</div>
                  <div className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                    После нажатия «Оплатить» вы получите реквизиты для перевода. Товар будет доставлен после подтверждения платежа.
                  </div>
                </div>

                <button onClick={handlePay} className="btn-primary w-full py-4 rounded-xl text-base">
                  Оплатить {modal.price} ₽
                </button>
              </>
            )}

            {payStep === "waiting" && (
              <div className="text-center py-4">
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full pulse-ring" style={{ background: "rgba(0,212,255,0.3)" }} />
                  <div className="absolute inset-0 rounded-full pulse-ring" style={{ background: "rgba(0,212,255,0.2)", animationDelay: "0.5s" }} />
                  <div className="relative w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(0,212,255,0.15)", border: "2px solid rgba(0,212,255,0.5)" }}>
                    <Icon name="Clock" size={32} style={{ color: "#00d4ff" }} />
                  </div>
                </div>

                <h3 className="font-bold text-white text-2xl mb-2">Ожидайте подтверждения оплаты</h3>
                <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Как только платёж поступит, мы отправим товар на ваш email или Telegram. Обычно это занимает 5–15 минут.
                </p>

                <div className="rounded-xl p-4 mb-6 text-left" style={{ background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.25)" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="CheckCircle" size={16} style={{ color: "#22c55e" }} />
                    <span className="text-sm font-semibold" style={{ color: "#22c55e" }}>Заказ принят</span>
                  </div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Товар: <span className="text-white">{modal.name}</span><br />
                    Сумма: <span className="text-white">{modal.price} ₽</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={closeModal} className="btn-outline flex-1 py-3 rounded-xl text-sm">
                    Закрыть
                  </button>
                  <button className="btn-primary flex-1 py-3 rounded-xl text-sm">
                    Написать в поддержку
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
