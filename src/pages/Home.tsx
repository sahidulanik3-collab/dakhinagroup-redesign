import React, { lazy, Suspense } from 'react';
import { useVariant } from '../hooks/useVariant';

const HeritageHome = lazy(() => import('../variants/v1-heritage/HeritageHome'));
const MinimalHome = lazy(() => import('../variants/v2-minimal/MinimalHome').then(m => ({ default: m.MinimalHome })));
const MidnightHome = lazy(() => import('../variants/v3-midnight/MidnightHome').then(m => ({ default: m.MidnightHome })));
const TropicalHome = lazy(() => import('../variants/v4-tropical/TropicalHome').then(m => ({ default: m.TropicalHome })));
const EditorialHome = lazy(() => import('../variants/v5-editorial/EditorialHome').then(m => ({ default: m.EditorialHome })));

const VariantSkeleton: React.FC = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 space-y-4">
    <div className="w-12 h-12 border-4 border-[#128341]/20 border-t-[#128341] rounded-full animate-spin" />
    <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Loading Architecture Variant...</span>
  </div>
);

export const Home: React.FC = () => {
  const { variantId } = useVariant();

  const renderVariant = () => {
    switch (variantId) {
      case 1:
        return <HeritageHome />;
      case 2:
        return <MinimalHome />;
      case 3:
        return <MidnightHome />;
      case 4:
        return <TropicalHome />;
      case 5:
        return <EditorialHome />;
      default:
        return <HeritageHome />;
    }
  };

  return <Suspense fallback={<VariantSkeleton />}>{renderVariant()}</Suspense>;
};

export default Home;
