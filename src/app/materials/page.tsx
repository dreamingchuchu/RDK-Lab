import { FolderArchive } from 'lucide-react';
import { loadMaterials } from '@/lib/loaders/materials';
import { MaterialList } from '@/components/thesis/MaterialList';

export const metadata = { title: 'Materials — RDK Lab' };

export default function MaterialsPage() {
  const materials = loadMaterials();

  return (
    <div className="max-w-content">
      <header className="mb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-tertiary mb-2">
          <FolderArchive className="w-3.5 h-3.5" />
          THESIS
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Materials</h1>
        <p className="text-sm text-text-secondary mt-1">
          研究素材管理，按类别组织。仅展示元数据，不依赖外部 API。
        </p>
      </header>

      <MaterialList materials={materials} />
    </div>
  );
}