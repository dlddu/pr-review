import { NavLink, Route, Routes } from 'react-router-dom';
import { Home } from './routes/home';
import { ReviewDetail } from './routes/review-detail';
import { Calibration } from './routes/calibration';
import { GapFill } from './routes/gap-fill';
import { KnowledgeAugment } from './routes/knowledge-augment';

/** The four product screens, mirroring docs/mockups/. */
const NAV = [
  { to: '/review', label: '리뷰 상세' },
  { to: '/calibration', label: '보정 근거' },
  { to: '/gap-fill', label: '공백 보완' },
  { to: '/knowledge', label: '지식 보강' },
] as const;

/**
 * App shell: the appbar navigation (C-appbar) plus the route table. Routes are
 * placeholders for now — markup porting from the mockups is deferred.
 */
export function App() {
  return (
    <>
      <header className="appbar">
        <NavLink to="/" className="brand">
          <span className="brand-mark" aria-hidden="true" />
          Lens
        </NavLink>
        <nav>
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <span className="spacer" />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/review" element={<ReviewDetail />} />
          <Route path="/calibration" element={<Calibration />} />
          <Route path="/gap-fill" element={<GapFill />} />
          <Route path="/knowledge" element={<KnowledgeAugment />} />
        </Routes>
      </main>
    </>
  );
}
