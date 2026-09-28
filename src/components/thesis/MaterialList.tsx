import type { Material } from '@/types/material';
import { PLACEHOLDERS } from '@/lib/utils/placeholders';

const categoryLabels: Record<string, string> = {
  dataset: 'Datasets',
  paper: 'Papers',
  documentation: 'Documentation',
  repository: 'Repositories',
  image: 'Images',
  experiment_file: 'Experiment Files',
  thesis_material: 'Thesis Materials',
};

export function MaterialList({ materials }: { materials: Material[] }) {
  const categories = Array.from(new Set(materials.map((m) => m.category)));

  return (
    <div className="space-y-8">
      {categories.map((cat) => {
        const items = materials.filter((m) => m.category === cat);
        return (
          <section key={cat}>
            <h2 className="section-title">{categoryLabels[cat] ?? cat}</h2>
            <ul className="space-y-2">
              {items.map((mat) => (
                <li key={mat.id} className="surface p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-text mb-1">{mat.title}</h3>
                      {mat.description && (
                        <p className="text-xs text-text-secondary leading-relaxed">{mat.description}</p>
                      )}
                      {mat.metadata && Object.keys(mat.metadata).length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {Object.entries(mat.metadata).map(([k, v]) => (
                            v && (
                              <span key={k} className="tag">
                                {k}: {v}
                              </span>
                            )
                          ))}
                        </div>
                      )}
                    </div>
                    {mat.url && (
                      <a
                        href={mat.url}
                        target={mat.url.startsWith('http') ? '_blank' : undefined}
                        rel={mat.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-xs text-accent hover:underline shrink-0"
                      >
                        打开 ↗
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}