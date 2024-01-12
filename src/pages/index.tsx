import Header from '../components/Header'

export default function Home() {
  return (
    <main>
      <Header />
      <div className="hero-section">
        <div className="container">
          <h1 className="text-5xl text-white font-bold">Unleash the Power of the Cloud</h1>
          <p className="text-white mt-4">
            Store, Sync, and Share with Ease: Seamlessly Access Your Files Anywhere, Anytime
          </p>
        </div>
      </div>
    </main>
  )
}
