import style from './About.module.css';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

export default function About() {
  const stats = [
    { icon: 'fas fa-store',              value: '500+',  label: 'Local Stores'     },
    { icon: 'fas fa-users',              value: '120K+', label: 'Happy Customers'  },
    { icon: 'fas fa-truck',              value: '1M+',   label: 'Orders Delivered' },
    { icon: 'fas fa-city',               value: '30+',   label: 'Cities Covered'   },
  ];

  const values = [
    { icon: 'fas fa-leaf',               title: 'Always Fresh',    desc: 'We source directly from local farms to guarantee the freshest produce on your table every single day.'  },
    { icon: 'fas fa-bolt',               title: 'Fast Delivery',   desc: 'From checkout to doorstep in under 60 minutes. Your groceries, on your schedule.'                       },
    { icon: 'fas fa-shield-alt',         title: 'Quality Assured', desc: 'Every product passes our quality checks before it reaches your cart. No compromises, ever.'            },
    { icon: 'fas fa-hand-holding-heart', title: 'Community First', desc: 'We partner with local farmers and small businesses, keeping money in your community.'                   },
  ];

  const team = [
    { initials: 'AH', name: 'Ahmed Hassan',   role: 'CEO & Co-founder'   },
    { initials: 'SN', name: 'Sara Nour',      role: 'Head of Operations' },
    { initials: 'MK', name: 'Mohamed Khaled', role: 'Lead Developer'     },
    { initials: 'LF', name: 'Laila Farouk',   role: 'Product Designer'   },
  ];

  return (
    <div className={style.page}>

      {/* Hero */}
      <section className={style.hero}>
        <Container>
          <div className={style.heroBadge}>
            <i className="fas fa-leaf"></i> Our Story
          </div>
          <h1 className={style.heroTitle}>
            Fresh Food,<br />
            <span className={style.heroAccent}>Delivered with Care</span>
          </h1>
          <p className={style.heroSub}>
            FreshCart was born from a simple idea: everyone deserves access to fresh,
            quality groceries without leaving home. Since 2020, we've been connecting
            neighbourhoods with the best local produce.
          </p>
          <div className={style.heroActions}>
            <Link to="/products" className={style.btnPrimary}>
              <i className="fas fa-shopping-basket"></i> Shop Now
            </Link>
            <Link to="/contact" className={style.btnOutline}>
              <i className="fas fa-envelope"></i> Contact Us
            </Link>
          </div>
        </Container>
        <span className={`${style.blob} ${style.blob1}`}></span>
        <span className={`${style.blob} ${style.blob2}`}></span>
      </section>

      {/* Stats */}
      <section className={style.statsSection}>
        <Container>
          <Row className="g-3">
            {stats.map((s, i) => (
              <Col key={i} xs={6} md={3}>
                <div className={style.statCard}>
                  <div className={style.statIcon}><i className={s.icon}></i></div>
                  <div className={style.statValue}>{s.value}</div>
                  <div className={style.statLabel}>{s.label}</div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Mission */}
      <section className={style.missionSection}>
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <div className={style.missionVisual}>
                <div className={style.missionIcon}><i className="fas fa-seedling"></i></div>
                <div className={style.missionRing}></div>
                <div className={style.missionRing2}></div>
              </div>
            </Col>
            <Col lg={6}>
              <p className={style.sectionTag}>Our Mission</p>
              <h2 className={style.sectionTitle}>
                Bringing the Farmer's Market{' '}
                <span className={style.heroAccent}>to Your Door</span>
              </h2>
              <p className={style.sectionText}>
                We believe grocery shopping should be effortless, sustainable, and joyful.
                FreshCart cuts out middlemen so you get fresher food at fairer prices,
                while farmers earn what they deserve.
              </p>
              <p className={style.sectionText}>
                Every order you place supports local agriculture, reduces food waste,
                and helps build a healthier food system for everyone.
              </p>
              <div className={style.missionTags}>
                {['Organic Options', 'Zero Waste', 'Local Farms', 'Fair Pricing'].map(t => (
                  <span key={t} className={style.tag}>
                    <i className="fas fa-check"></i> {t}
                  </span>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Values */}
      <section className={style.valuesSection}>
        <Container>
          <div className={style.centeredHeader}>
            <p className={style.sectionTag}>Why FreshCart</p>
            <h2 className={style.sectionTitle}>What Sets Us Apart</h2>
          </div>
          <Row className="g-4 mt-2">
            {values.map((v, i) => (
              <Col key={i} sm={6} lg={3}>
                <div className={style.valueCard}>
                  <div className={style.valueIconWrap}><i className={v.icon}></i></div>
                  <h3 className={style.valueTitle}>{v.title}</h3>
                  <p className={style.valueDesc}>{v.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Team */}
      <section className={style.teamSection}>
        <Container>
          <div className={style.centeredHeader}>
            <p className={style.sectionTag}>The People</p>
            <h2 className={style.sectionTitle}>Meet the Team</h2>
          </div>
          <Row className="g-4 mt-2 justify-content-center">
            {team.map((m, i) => (
              <Col key={i} xs={6} md={3}>
                <div className={style.teamCard}>
                  <div className={style.teamAvatar}>{m.initials}</div>
                  <h4 className={style.teamName}>{m.name}</h4>
                  <p className={style.teamRole}>{m.role}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA */}
      <section className={style.ctaSection}>
        <Container className="text-center">
          <i className={`fas fa-shopping-cart ${style.ctaIcon}`}></i>
          <h2 className={style.ctaTitle}>Ready to taste the difference?</h2>
          <p className={style.ctaSub}>Join 120,000+ customers who switched to fresher groceries.</p>
          <Link to="/register" className={style.btnPrimary}>
            <i className="fas fa-user-plus"></i> Get Started — It's Free
          </Link>
        </Container>
      </section>

    </div>
  );
}