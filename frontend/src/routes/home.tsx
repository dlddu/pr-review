import { Link } from 'react-router-dom';

const SCREENS = [
  { to: '/review', title: '리뷰 상세', cover: 'J1 S1–S5 · J2 S1 · J3 S4', values: 'V1·V2·V5' },
  { to: '/calibration', title: '보정 근거', cover: 'J3 S1–S3', values: 'V3·V4' },
  { to: '/gap-fill', title: '공백 보완 → 재리뷰', cover: 'J2 S2–S5', values: 'V5' },
  { to: '/knowledge', title: '지식 보강', cover: 'J4 S1–S4', values: 'V4' },
] as const;

/** Home — landing that links to the four product screens. Placeholder. */
export function Home() {
  return (
    <div className="shell">
      <p className="eyebrow">리뷰 렌즈 · Lens</p>
      <h1 className="pr-title">PR 리뷰를 펼쳐 보는 도구</h1>
      <p className="lede muted">
        자동 리뷰의 논리를 주장·근거로 펼쳐 신뢰·디버깅 가능하게 만드는 개인용 도구. 아래 4개 화면이
        4개 여정의 18단계를 덮는다. 지금은 골격(placeholder)만 렌더된다.
      </p>
      <div className="gallery" style={{ marginTop: 'var(--s6)' }}>
        {SCREENS.map((s) => (
          <Link key={s.to} to={s.to} className="gcard">
            <p className="eyebrow">{s.values}</p>
            <h3>{s.title}</h3>
            <p>{s.cover}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
