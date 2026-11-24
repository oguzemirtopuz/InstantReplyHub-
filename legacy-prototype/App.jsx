function App() {
  const [view, setView] = React.useState('welcome')
  const [user, setUser] = React.useState(null)
  const [integration, setIntegration] = React.useState(null)
  const [leads, setLeads] = React.useState([])
  const [selectedLead, setSelectedLead] = React.useState(null)
  const [metrics, setMetrics] = React.useState({ total: 0, responded: 0, avgResponseTime: 0 })

  // Simulate AI response generation
  const generateResponse = (lead) => {
    const response = `Merhaba ${lead.name}, ilginiz için teşekkürler! En kısa sürede sizinle iletişime geçeceğiz. 🚀`
    const now = Date.now()
    const updatedLead = { ...lead, response, status: 'responded', respondedAt: now }
    setLeads((prev) => prev.map((l) => (l.id === lead.id ? updatedLead : l)))
  }

  // Update metrics when leads change
  React.useEffect(() => {
    const total = leads.length
    const responded = leads.filter((l) => l.status === 'responded').length
    const responseTimes = leads
      .filter((l) => l.status === 'responded')
      .map((l) => l.respondedAt - l.createdAt)
    const avgResponseTime =
      responseTimes.length > 0
        ? Math.round(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length / 1000)
        : 0
    setMetrics({ total, responded, avgResponseTime })
  }, [leads])

  // Handlers
  const handleRegister = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    setUser({ email })
    setView('integration')
  }

  const handleConnectIntegration = (e) => {
    e.preventDefault()
    const platform = e.target.platform.value
    setIntegration(platform)
    setView('dashboard')
  }

  const handleNewLead = (e) => {
    e.preventDefault()
    const name = e.target.name.value
    const email = e.target.email.value
    const newLead = {
      id: Date.now(),
      name,
      email,
      status: 'new',
      createdAt: Date.now(),
    }
    setLeads((prev) => [...prev, newLead])
    // Auto generate AI response after short delay
    setTimeout(() => generateResponse(newLead), 1500)
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(leads, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'leads.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  // Views
  const renderWelcome = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6">InstantReplyHub 🚀</h1>
      <form onSubmit={handleRegister} className="w-full max-w-sm bg-white p-6 rounded shadow">
        <label className="block mb-2 font-medium">E‑posta</label>
        <input
          name="email"
          type="email"
          required
          className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Başla ✨
        </button>
      </form>
    </div>
  )

  const renderIntegration = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h2 className="text-2xl font-semibold mb-4">Form Entegrasyonu Bağla ⚙️</h2>
      <form onSubmit={handleConnectIntegration} className="w-full max-w-md bg-white p-6 rounded shadow">
        <label className="block mb-2 font-medium">Platform</label>
        <select
          name="platform"
          required
          className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seçiniz...</option>
          <option value="Typeform">Typeform</option>
          <option value="Webflow">Webflow</option>
          <option value="Custom">Custom</option>
        </select>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Bağla 📊
        </button>
      </form>
    </div>
  )

  const renderDashboard = () => (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard 📈</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setView('report')}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
          >
            Rapor Al 📊
          </button>
          <button
            onClick={() => setView('integration')}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            Entegrasyon 🔧
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-medium mb-2">Toplam Lead 📥</h3>
          <p className="text-2xl">{metrics.total}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-medium mb-2">Yanıtlanan 📤</h3>
          <p className="text-2xl">{metrics.responded}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-medium mb-2">Ortalama Yanıt Süresi (s)</h3>
          <p className="text-2xl">{metrics.avgResponseTime}</p>
        </div>
      </section>

      <section className="bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-4">Lead Listesi 💡</h3>
        {leads.length === 0 ? (
          <p className="text-gray-500">Henüz lead yok. Formu test edin.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="pb-2">İsim</th>
                <th className="pb-2">E‑posta</th>
                <th className="pb-2">Durum</th>
                <th className="pb-2">Aksiyon</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b">
                  <td className="py-2">{lead.name}</td>
                  <td className="py-2">{lead.email}</td>
                  <td className="py-2 capitalize">{lead.status}</td>
                  <td className="py-2">
                    <button
                      onClick={() => {
                        setSelectedLead(lead)
                        setView('leadDetail')
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      Detay 🔍
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="mt-6 bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-4">Yeni Lead Simülasyonu ✨</h3>
        <form onSubmit={handleNewLead} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="İsim"
            required
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="email"
            placeholder="E‑posta"
            type="email"
            required
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Lead Ekle 🚀
          </button>
        </form>
      </section>
    </div>
  )

  const renderLeadDetail = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded shadow p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Lead Detayı 🔎</h2>
        {selectedLead && (
          <>
            <p>
              <strong>İsim:</strong> {selectedLead.name}
            </p>
            <p>
              <strong>E‑posta:</strong> {selectedLead.email}
            </p>
            <p>
              <strong>Durum:</strong> {selectedLead.status}
            </p>
            {selectedLead.response && (
              <p className="mt-2 p-2 bg-gray-100 rounded">
                <strong>Oluşturulan Yanıt:</strong> {selectedLead.response}
              </p>
            )}
          </>
        )}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setView('dashboard')}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            Geri Dön
          </button>
        </div>
      </div>
    </div>
  )

  const renderReport = () => (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-semibold mb-6">Rapor & Dışa Aktarım 📂</h2>
      <pre className="bg-white p-4 rounded shadow w-full max-w-2xl overflow-auto">
        {JSON.stringify(leads, null, 2)}
      </pre>
      <div className="mt-4 flex gap-2">
        <button
          onClick={handleExport}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          JSON Olarak İndir 💾
        </button>
        <button
          onClick={() => setView('dashboard')}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Geri Dön
        </button>
      </div>
    </div>
  )

  // Main render
  return (
    <>
      {view === 'welcome' && renderWelcome()}
      {view === 'integration' && renderIntegration()}
      {view === 'dashboard' && renderDashboard()}
      {view === 'leadDetail' && renderLeadDetail()}
      {view === 'report' && renderReport()}
    </>
  )
}