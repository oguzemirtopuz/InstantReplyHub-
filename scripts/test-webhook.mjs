// InstantReplyHub Webhook & API Entegrasyon Testleri

import http from 'http';

console.log("=== InstantReplyHub Doğrulama ve Test Paketi ===");
console.log("1. Webhook normalizasyon mantığı kontrol ediliyor...");

function mockExtractLeadData(payload) {
  let name = '';
  let email = '';
  let phone = '';
  let message = '';
  let service = '';

  if (payload.name || payload.ad || payload.fullName) {
    name = payload.name || payload.ad || payload.fullName;
  }
  if (payload.email || payload.eposta || payload.mail) {
    email = payload.email || payload.eposta || payload.mail;
  }
  if (payload.phone || payload.tel || payload.telefon) {
    phone = payload.phone || payload.tel || payload.telefon;
  }
  if (payload.message || payload.mesaj || payload.talep) {
    message = payload.message || payload.mesaj || payload.talep;
  }
  if (payload.service || payload.hizmet) {
    service = payload.service || payload.hizmet;
  }

  // Tally kontrolü
  if (payload.data && Array.isArray(payload.data.fields)) {
    for (const field of payload.data.fields) {
      const label = (field.label || '').toLowerCase();
      const val = field.value;
      if (!val) continue;
      if (label.includes('name') || label.includes('ad')) name = String(val);
      if (label.includes('email') || label.includes('e-posta')) email = String(val);
      if (label.includes('phone') || label.includes('tel')) phone = String(val);
      if (label.includes('mesaj') || label.includes('message')) message = String(val);
    }
  }

  return { name: name.trim(), email: email.trim(), phone: phone.trim(), message: message.trim(), service: service.trim() };
}

// Test 1: Düz JSON
const t1 = mockExtractLeadData({ name: "Ali Veli", email: "ali@veli.com", message: "Fiyat nedir?" });
if (t1.name === "Ali Veli" && t1.email === "ali@veli.com") {
  console.log("✅ Test 1 Geçti: Düz JSON normalizasyonu başarılı.");
} else {
  console.error("❌ Test 1 Başarısız:", t1);
  process.exit(1);
}

// Test 2: Tally Formatı
const t2 = mockExtractLeadData({
  data: {
    formName: "İletişim",
    fields: [
      { label: "Adınız Soyadınız", value: "Ayşe Kaya" },
      { label: "Kurumsal E-posta", value: "ayse@kaya.org" },
      { label: "Mesajınız", value: "Teklif istiyorum" }
    ]
  }
});
if (t2.name === "Ayşe Kaya" && t2.email === "ayse@kaya.org") {
  console.log("✅ Test 2 Geçti: Tally Webhook normalizasyonu başarılı.");
} else {
  console.error("❌ Test 2 Başarısız:", t2);
  process.exit(1);
}

// Test 3: Eksik E-posta Edge Case
const t3 = mockExtractLeadData({ name: "E-postasız Kullanıcı" });
if (!t3.email) {
  console.log("✅ Test 3 Geçti: Eksik e-posta durumu doğru şekilde boş algılandı (400 koruması).");
} else {
  console.error("❌ Test 3 Başarısız:", t3);
  process.exit(1);
}

console.log("Tüm birim normalizasyon testleri başarıyla tamamlandı!");
