import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HOLO_IMG = "https://cdn.poehali.dev/projects/dba79d1b-97bb-4b6a-979c-ab1ce0478951/files/8edd5a1c-0409-4cf3-9cf6-0b36a9b7499d.jpg";
const COUPLE_IMG = "https://cdn.poehali.dev/projects/dba79d1b-97bb-4b6a-979c-ab1ce0478951/files/006ffc2b-4b25-4871-aa39-de60322042d1.jpg";
const GALLERY_IMG = "https://cdn.poehali.dev/projects/dba79d1b-97bb-4b6a-979c-ab1ce0478951/files/c32be63d-fe1c-460b-bd85-7de0d33f1a8a.jpg";

const SETTINGS = {
  genres: ["Школьная романтика", "Фэнтези", "Isekai", "Повседневность", "Драма", "Комедия"],
  settings: ["Школа", "Средневековый город", "Другой мир", "Кафе", "Под сакурой", "Горный замок"],
  moods: ["Сладко-горький", "Нежный", "Страстный", "Комичный", "Меланхоличный"],
};

const STORIES = [
  {
    genre: "Фэнтези",
    setting: "Горный замок",
    text: "Луна заливала каменные плиты серебром. Айри остановилась у окна башни, не зная, что за её спиной уже стоял он — принц тёмного королевства, чьи глаза светились мягким янтарём. «Ты не должна здесь быть», — произнёс он тихо. «Знаю», — ответила она, не оборачиваясь. — «Но именно здесь моё сердце нашло покой.» Пауза длилась вечность. Его рука осторожно легла на её плечо, и она наконец повернулась — навстречу судьбе, которую давно ждала.",
    hero: "Принц и путница",
    tag: "👑",
  },
  {
    genre: "Школьная романтика",
    setting: "Под сакурой",
    text: "Лепестки кружились в майском воздухе, когда Сара нашла записку в своём учебнике. «Хочу показать тебе кое-что». Почерк был знакомым — слишком знакомым. После уроков она пришла к старой сакуре за спортзалом. Кейто ждал, засунув руки в карманы, взгляд — в сторону. «Каждый год она цветёт. И каждый год я думаю: успею ли сказать?» Он наконец посмотрел на неё. «В этот раз — решил успеть».",
    hero: "Тихое признание",
    tag: "🌸",
  },
  {
    genre: "Isekai",
    setting: "Другой мир",
    text: "Она провалилась в другой мир без предупреждения — и первым, кого увидела, был рыцарь с серебряными волосами, склонившийся над ней. «Ты жива?» — голос низкий, осторожный. «Почти», — прохрипела она. Губы его дрогнули — не совсем улыбка, но близко. Он снял плащ и накрыл её. «Этот мир опасен для чужаков». «Значит, будь рядом», — сказала она прежде, чем успела подумать. И он не ушёл.",
    hero: "Рыцарь и чужестранка",
    tag: "⚔️",
  },
  {
    genre: "Повседневность",
    setting: "Кафе",
    text: "Каждое утро он заказывал американо и садился у окна. Мика это знала — потому что каждое утро специально вытирала именно этот столик медленнее обычного. В четверг он опоздал. В пятницу оставил на салфетке: «Спасибо, что оставляешь мне место». В субботу она написала в ответ: «Оно всегда твоё». В воскресенье они пили кофе вместе.",
    hero: "Утреннее кафе",
    tag: "☕",
  },
  {
    genre: "Драма",
    setting: "Горный замок",
    text: "Они не виделись три года. Потом она пришла на его концерт — случайно, говорила себе. Но заняла место в первом ряду. Когда его взгляд нашёл её в темноте зала, пальцы на секунду замерли над клавишами. Только на секунду. Музыка продолжилась — но в ней появилась новая тема. Горькая. Нежная. Её.",
    hero: "Три года спустя",
    tag: "🎹",
  },
  {
    genre: "Комедия",
    setting: "Школа",
    text: "Признание провалилось трижды: сначала его перебил звонок, потом подбежал учитель с журналом, потом начался дождь и она прикрылась его учебником — тем самым, где он тайно написал её имя на каждой второй странице. «Ты это видела?» — выдавил он. Она помолчала. «С третьего класса», — сказала она, пряча улыбку. «Просто ждала, когда ты наконец скажет это вслух».",
    hero: "Три попытки",
    tag: "😊",
  },
];

const GALLERY_ITEMS = [
  { img: COUPLE_IMG, title: "Под сакурой", genre: "Романтика", tag: "🌸" },
  { img: HOLO_IMG, title: "Холо — Волчица", genre: "Волчица и Пряности", tag: "🐺" },
  { img: GALLERY_IMG, title: "Аниме галерея", genre: "Разное", tag: "✨" },
  { img: COUPLE_IMG, title: "Лунный вечер", genre: "Фэнтези", tag: "🌙" },
  { img: HOLO_IMG, title: "Дух урожая", genre: "Волчица и Пряности", tag: "🍎" },
  { img: GALLERY_IMG, title: "Весенние чувства", genre: "Повседневность", tag: "💫" },
];

const SakuraParticles = () => {
  const particles = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left: (i * 6.5) % 100,
    delay: (i * 0.9) % 12,
    duration: 9 + (i % 5),
    size: 13 + (i % 8),
    emoji: ["🌸", "🌸", "🌸", "✿", "❀"][i % 5],
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="sakura-particle"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            fontSize: `${p.size}px`,
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
};

export default function Index() {
  const [activeSection, setActiveSection] = useState("generator");
  const [selectedGenre, setSelectedGenre] = useState("Фэнтези");
  const [selectedSetting, setSelectedSetting] = useState("Горный замок");
  const [selectedMood, setSelectedMood] = useState("Нежный");
  const [currentStory, setCurrentStory] = useState<(typeof STORIES)[0] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState("Все");
  const [storyKey, setStoryKey] = useState(0);
  const generatorRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  const scrollTo = (section: string) => {
    setActiveSection(section);
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {
      generator: generatorRef,
      gallery: galleryRef,
      about: aboutRef,
    };
    refs[section]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const generateStory = () => {
    setIsGenerating(true);
    setCurrentStory(null);
    setTimeout(() => {
      const random = STORIES[Math.floor(Math.random() * STORIES.length)];
      setCurrentStory(random);
      setStoryKey((k) => k + 1);
      setIsGenerating(false);
    }, 1600);
  };

  const galleryFilters = ["Все", "Романтика", "Волчица и Пряности", "Фэнтези", "Повседневность"];
  const filteredGallery =
    galleryFilter === "Все"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.genre === galleryFilter);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      if (aboutRef.current && scroll >= aboutRef.current.offsetTop - 200) {
        setActiveSection("about");
      } else if (galleryRef.current && scroll >= galleryRef.current.offsetTop - 200) {
        setActiveSection("gallery");
      } else {
        setActiveSection("generator");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative" style={{ background: "#0d0a1a" }}>
      <SakuraParticles />

      {/* NAV */}
      <nav className="nav-blur fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌸</span>
            <span
              className="font-bold"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                background: "linear-gradient(135deg, #ff6eb4, #c084fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: "1.3rem",
              }}
            >
              АниМе Романтика
            </span>
          </div>
          <div className="flex gap-1">
            {[
              { id: "generator", label: "Генератор", icon: "Sparkles" },
              { id: "gallery", label: "Галерея", icon: "Image" },
              { id: "about", label: "О проекте", icon: "Heart" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2"
                style={{
                  background:
                    activeSection === item.id
                      ? "linear-gradient(135deg, rgba(255,110,180,0.25), rgba(192,132,252,0.2))"
                      : "transparent",
                  color: activeSection === item.id ? "#ff6eb4" : "rgba(255,255,255,0.55)",
                  border: activeSection === item.id ? "1px solid rgba(255,110,180,0.4)" : "1px solid transparent",
                }}
              >
                <Icon name={item.icon as "Sparkles"} size={14} />
                <span className="hidden md:inline">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 65% 45%, rgba(192,132,252,0.18) 0%, transparent 60%), radial-gradient(ellipse at 25% 65%, rgba(255,110,180,0.12) 0%, transparent 55%)",
          }}
        />
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium animate-fade-in-up"
              style={{
                background: "rgba(255,110,180,0.15)",
                border: "1px solid rgba(255,110,180,0.3)",
                color: "#ff6eb4",
              }}
            >
              <span>✨</span> Генератор аниме романтики
            </div>
            <h1
              className="glow-text animate-fade-in-up delay-100"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 300,
                lineHeight: 1.1,
                color: "#fff",
              }}
            >
              Твоя история <br />
              <em style={{ color: "#ff6eb4", fontStyle: "italic" }}>любви</em>{" "}
              <span style={{ color: "#c084fc" }}>ждёт</span>
            </h1>
            <p
              className="animate-fade-in-up delay-200 text-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.55)", maxWidth: "420px" }}
            >
              Создавай уникальные романтические аниме-сцены. Выбирай жанр, сеттинг и настроение — и получай
              историю, которая заставит сердце биться чаще.
            </p>
            <div className="flex gap-4 animate-fade-in-up delay-300">
              <button onClick={() => scrollTo("generator")} className="btn-sakura px-8 py-3 rounded-full font-semibold text-white">
                Создать историю 🌸
              </button>
              <button
                onClick={() => scrollTo("gallery")}
                className="px-6 py-3 rounded-full font-medium transition-all"
                style={{ border: "1px solid rgba(192,132,252,0.35)", color: "#c084fc", background: "rgba(192,132,252,0.08)" }}
              >
                Галерея
              </button>
            </div>
          </div>

          <div className="relative flex justify-center animate-fade-in-up delay-400">
            <div className="animate-float relative">
              <div
                className="absolute inset-0 rounded-3xl animate-pulse-glow"
                style={{ filter: "blur(40px)", background: "rgba(255,110,180,0.3)" }}
              />
              <img
                src={HOLO_IMG}
                alt="Холо — Волчица и Пряности"
                className="relative rounded-3xl object-cover"
                style={{
                  width: "340px",
                  height: "420px",
                  border: "2px solid rgba(255,110,180,0.35)",
                  boxShadow: "0 30px 80px rgba(255,110,180,0.25)",
                }}
              />
              <div
                className="absolute -bottom-4 -right-4 rounded-2xl px-4 py-3 text-sm font-medium"
                style={{ background: "rgba(13,10,26,0.9)", border: "1px solid rgba(245,158,11,0.4)", color: "#f59e0b" }}
              >
                🐺 Холо — Волчица и Пряности
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={24} style={{ color: "#ff6eb4", opacity: 0.5 }} />
        </div>
      </section>

      {/* GENERATOR */}
      <section ref={generatorRef} className="relative py-24 px-6">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(255,110,180,0.07) 0%, transparent 50%)" }}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs mb-4"
              style={{ background: "rgba(255,110,180,0.12)", border: "1px solid rgba(255,110,180,0.25)", color: "#ff6eb4" }}
            >
              <Icon name="Sparkles" size={12} /> Генератор историй
            </div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#fff",
                fontWeight: 300,
              }}
            >
              Настрой свою <em style={{ color: "#ff6eb4" }}>историю</em>
            </h2>
            <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              Выбери параметры и нажми кнопку — история создастся мгновенно
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { label: "🎭 Жанр", options: SETTINGS.genres, value: selectedGenre, set: setSelectedGenre },
              { label: "🏯 Место", options: SETTINGS.settings, value: selectedSetting, set: setSelectedSetting },
              { label: "💫 Настроение", options: SETTINGS.moods, value: selectedMood, set: setSelectedMood },
            ].map((group) => (
              <div key={group.label} className="bg-card-anime rounded-2xl p-5">
                <div className="text-sm font-semibold mb-4" style={{ color: "#c084fc" }}>
                  {group.label}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => group.set(opt)}
                      className="tag-pill"
                      style={
                        group.value === opt
                          ? { background: "rgba(255,110,180,0.25)", borderColor: "#ff6eb4", color: "#ff6eb4" }
                          : {}
                      }
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mb-10">
            <button
              onClick={generateStory}
              disabled={isGenerating}
              className="btn-sakura px-12 py-4 rounded-full font-bold text-white text-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <span className="flex items-center gap-3">
                  <span className="inline-block animate-spin">🌸</span>
                  Создаю историю...
                </span>
              ) : (
                "✨ Создать историю"
              )}
            </button>
          </div>

          {currentStory && (
            <div key={storyKey} className="story-gradient rounded-3xl p-8 animate-story-appear">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{currentStory.tag}</span>
                <div>
                  <div
                    className="font-bold text-white"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem" }}
                  >
                    {currentStory.hero}
                  </div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {currentStory.genre} · {currentStory.setting}
                  </div>
                </div>
              </div>
              <p
                style={{
                  color: "rgba(255,255,255,0.85)",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.15rem",
                  lineHeight: 1.85,
                  letterSpacing: "0.01em",
                }}
              >
                {currentStory.text}
              </p>
              <div className="mt-6 flex items-center gap-4">
                <button
                  className="text-sm flex items-center gap-2 px-4 py-2 rounded-full transition-all"
                  style={{ color: "#ff6eb4", border: "1px solid rgba(255,110,180,0.3)", background: "rgba(255,110,180,0.08)" }}
                >
                  <Icon name="Heart" size={14} /> Нравится
                </button>
                <button
                  onClick={generateStory}
                  className="text-sm flex items-center gap-2 px-4 py-2 rounded-full transition-all"
                  style={{ color: "#c084fc", border: "1px solid rgba(192,132,252,0.3)", background: "rgba(192,132,252,0.08)" }}
                >
                  <Icon name="RefreshCw" size={14} /> Ещё история
                </button>
              </div>
            </div>
          )}

          {!currentStory && !isGenerating && (
            <div
              className="rounded-3xl p-12 text-center"
              style={{ background: "rgba(255,255,255,0.02)", border: "2px dashed rgba(255,110,180,0.15)" }}
            >
              <div className="text-5xl mb-4">🌸</div>
              <p
                style={{
                  color: "rgba(255,255,255,0.3)",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.2rem",
                }}
              >
                Твоя история ждёт рождения...
              </p>
            </div>
          )}
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* GALLERY */}
      <section ref={galleryRef} className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs mb-4"
              style={{ background: "rgba(192,132,252,0.12)", border: "1px solid rgba(192,132,252,0.25)", color: "#c084fc" }}
            >
              <Icon name="Image" size={12} /> Галерея
            </div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#fff",
                fontWeight: 300,
              }}
            >
              Аниме <em style={{ color: "#c084fc" }}>галерея</em>
            </h2>
          </div>

          <div className="flex gap-2 justify-center flex-wrap mb-10">
            {galleryFilters.map((f) => (
              <button
                key={f}
                onClick={() => setGalleryFilter(f)}
                className="tag-pill text-sm px-5 py-2"
                style={
                  galleryFilter === f
                    ? { background: "rgba(192,132,252,0.25)", borderColor: "#c084fc", color: "#c084fc" }
                    : {}
                }
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {filteredGallery.map((item, i) => (
              <div
                key={i}
                className="gallery-card rounded-2xl overflow-hidden cursor-pointer"
                style={{ border: "1px solid rgba(255,110,180,0.15)" }}
              >
                <div className="relative">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full object-cover"
                    style={{ height: "220px" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
                  <div className="absolute bottom-3 left-3 z-20">
                    <div className="font-semibold text-white text-sm">
                      {item.tag} {item.title}
                    </div>
                    <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                      {item.genre}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* ABOUT */}
      <section ref={aboutRef} className="relative py-24 px-6">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(192,132,252,0.07) 0%, transparent 55%)" }}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs mb-4"
              style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)", color: "#f59e0b" }}
            >
              <Icon name="Heart" size={12} /> О проекте
            </div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#fff",
                fontWeight: 300,
              }}
            >
              Место, где рождаются <em style={{ color: "#f59e0b" }}>чувства</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
            <div className="space-y-6">
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.9 }}>
                Аниме романтика — это особый язык эмоций. Здесь каждый взгляд имеет значение,
                каждое слово несёт глубину, а тишина говорит громче крика.
              </p>
              <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.9 }}>
                Наш генератор создаёт уникальные истории, вдохновлённые лучшими аниме жанра:
                от школьных дворов под сакурой до средневековых замков в лунном свете.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { num: "6", label: "Историй в базе" },
                  { num: "6", label: "Жанров" },
                  { num: "∞", label: "Комбинаций" },
                  { num: "🌸", label: "Атмосфера" },
                ].map((stat) => (
                  <div key={stat.num + stat.label} className="bg-card-anime rounded-2xl p-4 text-center">
                    <div
                      className="font-bold text-2xl mb-1 glow-amber"
                      style={{ fontFamily: "'Cormorant Garamond', serif", color: "#f59e0b" }}
                    >
                      {stat.num}
                    </div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="animate-float">
                <img
                  src={COUPLE_IMG}
                  alt="Аниме романтика"
                  className="rounded-3xl w-full object-cover"
                  style={{
                    height: "380px",
                    border: "2px solid rgba(192,132,252,0.25)",
                    boxShadow: "0 30px 80px rgba(192,132,252,0.2)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Holo special card */}
          <div
            className="rounded-3xl overflow-hidden"
            style={{ border: "1px solid rgba(245,158,11,0.3)", background: "rgba(245,158,11,0.04)" }}
          >
            <div className="grid md:grid-cols-3">
              <div className="relative overflow-hidden" style={{ minHeight: "240px" }}>
                <img
                  src={HOLO_IMG}
                  alt="Холо"
                  className="w-full h-full object-cover absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[rgba(13,10,26,0.8)] hidden md:block" />
              </div>
              <div className="md:col-span-2 p-8 flex flex-col justify-center">
                <div
                  className="text-xs font-medium mb-3"
                  style={{ color: "#f59e0b", letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                  🐺 Особый гость
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.8rem",
                    fontWeight: 400,
                    color: "#fff",
                    lineHeight: 1.2,
                    marginBottom: "12px",
                  }}
                >
                  Холо, Мудрая Волчица
                </h3>
                <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, fontSize: "0.95rem" }}>
                  Древний дух урожая из аниме «Волчица и Пряности». Умна, остроумна, немного самонадеянна —
                  и невероятно обаятельна. Её история с торговцем Крафтом Лоуренсом стала одной из самых
                  запоминающихся романтических линий в аниме.
                </p>
                <div className="flex flex-wrap gap-3 mt-6">
                  {["Волчьи уши 🐺", "Мудрость богов ✨", "Любовь к яблокам 🍎"].map((tag) => (
                    <span
                      key={tag}
                      className="tag-pill text-xs"
                      style={{
                        color: "#f59e0b",
                        borderColor: "rgba(245,158,11,0.3)",
                        background: "rgba(245,158,11,0.1)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center" style={{ borderTop: "1px solid rgba(255,110,180,0.1)" }}>
        <div className="text-2xl mb-3">🌸</div>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "rgba(255,255,255,0.3)",
            fontSize: "1rem",
            fontStyle: "italic",
          }}
        >
          «Любовь — это когда хочешь разделить с кем-то не радость, а тишину»
        </p>
        <p className="text-xs mt-4" style={{ color: "rgba(255,255,255,0.2)" }}>
          АниМе Романтика · Генератор историй 2026
        </p>
      </footer>
    </div>
  );
}
