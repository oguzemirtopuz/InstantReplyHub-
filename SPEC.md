# InstantReplyHub

> Leadsiniz Anında Cevaplanır, Dönüşümünüz Katlanır

## Kullanıcı Akışları
- 1. Adım: Kullanıcı kayıt/giriş yapar ve karşılama ekranını görür
- 2. Adım: Kullanıcı, Typeform/Webflow gibi bir form platformunu bağlar
- 3. Adım: Form üzerinden gelen lead otomatik olarak yakalanır
- 4. Adım: Sistem, lead verisine göre AI‑destekli yanıt şablonunu oluşturur ve e‑posta/SMS olarak gönderir
- 5. Adım: Kullanıcı dashboard’da yanıt süresi, lead durumu ve dönüşüm metriklerini inceler
- 6. Adım: Kullanıcı rapor alır veya veriyi CSV/JSON olarak dışa aktarır

## Veri Modeli
- **users**: Kullanıcı profilleri, kimlik doğrulama ve tercih ayarları
- **integrations**: Bağlanan form/landing page platformları ve API anahtarları
- **leads**: Yakalanan lead kayıtları, form alanları ve zaman damgası
- **replies**: AI tarafından oluşturulan yanıt şablonları ve gönderim durumu
- **analytics**: Yanıt süresi, dönüşüm oranı ve diğer KPI’lar

## Ekranlar
- 1. Giriş & Kayıt / Karşılama Paneli
- 2. Entegrasyon Bağlantı Formu (Typeform, Webflow vb.)
- 3. Lead Detay ve AI Yanıt Oluşturma Ekranı
- 4. Ana Dashboard – İstatistikler, Grafikler ve Lead Listesi
- 5. Rapor/Dışa Aktarım Sayfası

## Kapsam Dışı
- Karmaşık takım izinleri ve çoklu şirket yönetimi (v2'ye bırakıldı)
- Özel mobil native bildirimler (PWA ile çözülecek)
- Ücretli üçüncü parti kurumsal API entegrasyonları (ör. Salesforce, HubSpot Enterprise)
- Gerçek zamanlı sohbet botu entegrasyonu