'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  subscribeActualites,
  addActualite,
  updateActualite,
  deleteActualite,
  subscribeGalerie,
  addGaleriePhoto,
  deleteGaleriePhoto,
  type Actualite,
  type GaleriePhoto,
} from '@/lib/firestore';
import { ALL_PHOTOS } from '@/app/galerie/photos';

type ActiveModule = 'actualites' | 'galerie';

// ─── Module Actualités ────────────────────────────────────────────────────────
function ActualitesModule() {
  const [actualites, setActualites] = useState<Actualite[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Actualite | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Omit<Actualite, 'id' | 'createdAt'>>({
    titre: '', date: '', heure: '', lieu: '', description: '', imageUrl: '', visible: true,
  });

  useEffect(() => {
    try {
      const unsub = subscribeActualites(setActualites);
      return unsub;
    } catch { return () => {}; }
  }, []);

  const resetForm = () => {
    setForm({ titre: '', date: '', heure: '', lieu: '', description: '', imageUrl: '', visible: true });
    setEditItem(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editItem?.id) await updateActualite(editItem.id, form);
      else await addActualite(form);
      resetForm();
    } finally { setSaving(false); }
  };

  const startEdit = (item: Actualite) => {
    setEditItem(item);
    setForm({
      titre: item.titre,
      date: item.date,
      heure: item.heure,
      lieu: item.lieu,
      description: item.description,
      imageUrl: item.imageUrl || '',
      visible: item.visible !== false,
    });
    setShowForm(true);
  };

  const handleToggleVisibility = async (item: Actualite) => {
    if (!item.id) return;
    try {
      await updateActualite(item.id, { visible: item.visible === false });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cet événement ?')) return;
    await deleteActualite(id);
  };

  const inputStyle = { background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', fontFamily: 'var(--font-opensans)', outline: 'none', color: 'white' };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: '1.3rem', color: 'white' }}>
          📅 Actualités & Événements
        </h2>
        {!showForm && (
          <button onClick={() => { resetForm(); setShowForm(true); }} className="btn-biais" style={{ fontSize: '0.85rem', padding: '0.6rem 1.3rem' }} id="admin-add-actualite-btn">
            + Ajouter une date
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="p-6 rounded-2xl mb-6" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h3 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '1rem', color: '#BA9C5A', marginBottom: '1.2rem' }}>
            {editItem ? '✏️ Modifier l\'événement' : '➕ Nouvel événement'}
          </h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {[
              { key: 'titre', label: 'Titre *', type: 'text', placeholder: 'Fest-Noz de rentrée' },
              { key: 'date', label: 'Date *', type: 'date', placeholder: '' },
              { key: 'heure', label: 'Heure *', type: 'text', placeholder: '20h00' },
              { key: 'lieu', label: 'Lieu *', type: 'text', placeholder: 'Salle des Fêtes d\'Orchies' },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', display: 'block', marginBottom: '0.4rem' }}>
                  {label.toUpperCase()}
                </label>
                <input type={type} value={form[key as keyof typeof form] as string} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} required={label.includes('*')} className="w-full px-4 py-3 rounded-xl text-sm" style={inputStyle} id={`admin-form-${key}`} />
              </div>
            ))}
          </div>
          <div className="mb-4">
            <label style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', display: 'block', marginBottom: '0.4rem' }}>DESCRIPTION *</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Décrivez l'événement..." required rows={3} className="w-full px-4 py-3 rounded-xl text-sm resize-none" style={inputStyle} id="admin-form-description" />
          </div>
          <div className="mb-4">
            <label style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', display: 'block', marginBottom: '0.4rem' }}>URL IMAGE (optionnel)</label>
            <input type="url" value={form.imageUrl || ''} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://..." className="w-full px-4 py-3 rounded-xl text-sm" style={inputStyle} id="admin-form-imageUrl" />
          </div>
          <div className="mb-6 flex items-center gap-3 select-none">
            <input
              type="checkbox"
              id="admin-form-visible"
              checked={form.visible !== false}
              onChange={(e) => setForm({ ...form, visible: e.target.checked })}
              className="w-5 h-5 rounded cursor-pointer"
              style={{ accentColor: '#0E676D' }}
            />
            <label
              htmlFor="admin-form-visible"
              style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.8rem', fontWeight: 700, color: 'white', cursor: 'pointer', letterSpacing: '0.05em' }}
            >
              VISIBLE SUR LE SITE PUBLIC
            </label>
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="btn-biais btn-biais-vert flex-1" style={{ fontSize: '0.85rem' }} id="admin-form-submit">
              {saving ? 'Enregistrement...' : editItem ? '✓ Mettre à jour' : '✓ Publier'}
            </button>
            <button type="button" onClick={resetForm} className="px-5 py-2 rounded-xl text-sm font-semibold" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-montserrat)' }} id="admin-form-cancel">
              Annuler
            </button>
          </div>
        </form>
      )}

      {actualites.length === 0 ? (
        <div className="text-center py-12" style={{ color: 'rgba(255,255,255,0.4)' }}>
          <p style={{ fontFamily: 'var(--font-opensans)' }}>Aucun événement. Ajoutez le premier !</p>
        </div>
      ) : (
        <div className="space-y-3">
          {actualites.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex-shrink-0 w-14 text-center py-2 rounded-lg" style={{ background: '#0E676D' }}>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 900, fontSize: '1.2rem', color: 'white', lineHeight: 1 }}>{new Date(item.date + 'T00:00:00').getDate()}</p>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '0.6rem', color: '#BA9C5A' }}>{new Date(item.date + 'T00:00:00').toLocaleDateString('fr-FR', { month: 'short' }).toUpperCase()}</p>
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '0.9rem', color: 'white', marginBottom: '0.1rem' }}>{item.titre}</p>
                <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.2rem' }}>{item.heure} — {item.lieu}</p>
                <div className="flex items-center gap-2">
                  {item.visible !== false ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold" style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981', fontFamily: 'var(--font-montserrat)' }}>
                      👁️ VISIBLE
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold" style={{ background: 'rgba(244,63,94,0.15)', color: '#f43f5e', fontFamily: 'var(--font-montserrat)' }}>
                      🙈 MASQUÉ
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleToggleVisibility(item)}
                  className="p-2 rounded-lg hover:bg-white/10"
                  style={{ color: item.visible !== false ? '#BA9C5A' : 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}
                  title={item.visible !== false ? 'Masquer sur le site' : 'Afficher sur le site'}
                  id={`admin-toggle-vis-${item.id}`}
                >
                  {item.visible !== false ? '👁️' : '🙈'}
                </button>
                <button onClick={() => startEdit(item)} className="p-2 rounded-lg hover:bg-white/10" style={{ color: '#0E676D', background: 'none', border: 'none', cursor: 'pointer' }} aria-label="Modifier" id={`admin-edit-${item.id}`}>✏️</button>
                <button onClick={() => item.id && handleDelete(item.id)} className="p-2 rounded-lg hover:bg-red-500/20" style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }} aria-label="Supprimer" id={`admin-delete-${item.id}`}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Module Galerie ───────────────────────────────────────────────────────────
function GalerieModule() {
  const [photos, setPhotos] = useState<GaleriePhoto[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [initializing, setInitializing] = useState(false);

  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  useEffect(() => {
    try { const unsub = subscribeGalerie(setPhotos); return unsub; } catch { return () => {}; }
  }, []);

  const handleInitialize = async () => {
    if (!confirm(`Voulez-vous copier les ${ALL_PHOTOS.length} photos par défaut dans la base de données ?`)) return;
    setInitializing(true);
    try {
      for (const p of ALL_PHOTOS) {
        await addGaleriePhoto({ url: p.src, alt: p.alt });
      }
      alert('Galerie initialisée avec succès !');
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'initialisation de la galerie.");
    } finally {
      setInitializing(false);
    }
  };

  const uploadFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) { alert('Choisissez une image'); return; }
    if (file.size > 10 * 1024 * 1024) { alert('Image trop volumineuse (max 10 Mo)'); return; }
    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET!);
    formData.append('folder', 'breizh-pevele');

    const xhr = new XMLHttpRequest();
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) setUploadProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = async () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        await addGaleriePhoto({ url: data.secure_url, alt: file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ') });
      } else {
        alert('Erreur upload');
      }
      setUploading(false);
      setUploadProgress(0);
    };
    xhr.onerror = () => { alert('Erreur upload'); setUploading(false); };
    xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`);
    xhr.send(formData);
  }, [CLOUD_NAME, UPLOAD_PRESET]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    Array.from(e.dataTransfer.files).forEach(uploadFile);
  }, [uploadFile]);

  const handleDeletePhoto = async (photo: GaleriePhoto) => {
    if (!confirm('Supprimer cette photo ?')) return;
    if (photo.id) await deleteGaleriePhoto(photo.id);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: '1.3rem', color: 'white' }}>📸 Galerie Photos</h2>
        <span style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>{photos.length} photo{photos.length > 1 ? 's' : ''}</span>
      </div>

      {photos.length === 0 ? (
        <div className="p-8 rounded-2xl text-center mb-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.15)' }}>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, color: '#BA9C5A', marginBottom: '0.5rem' }}>
            📭 Galerie vide dans la base de données
          </p>
          <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', maxWidth: '550px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
            Actuellement, la base de données Firestore ne contient aucune photo de galerie. Le site public affiche donc la galerie locale par défaut.
            Pour pouvoir les gérer (les supprimer, en ajouter), importez-les dans la base en un clic :
          </p>
          <button
            onClick={handleInitialize}
            disabled={initializing}
            className="btn-biais"
            style={{ fontSize: '0.85rem', padding: '0.7rem 1.5rem', cursor: 'pointer' }}
            id="admin-init-galerie-btn"
          >
            {initializing ? 'Initialisation en cours...' : `📥 Charger les ${ALL_PHOTOS.length} photos par défaut`}
          </button>
        </div>
      ) : null}

      <div onClick={() => !uploading && fileInputRef.current?.click()} onDrop={handleDrop} onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} className="flex flex-col items-center justify-center p-10 rounded-2xl mb-6 cursor-pointer transition-all" style={{ background: dragOver ? 'rgba(14,103,109,0.2)' : 'rgba(255,255,255,0.04)', border: `2px dashed ${dragOver ? '#0E676D' : 'rgba(255,255,255,0.15)'}` }} id="admin-dropzone">
        <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={(e) => Array.from(e.target.files || []).forEach(uploadFile)} className="hidden" id="admin-file-input" />
        {uploading ? (
          <>
            <div className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin mb-4" style={{ borderColor: '#0E676D', borderTopColor: 'transparent' }} />
            <p style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>Upload... {uploadProgress}%</p>
            <div className="w-48 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <div className="h-full rounded-full" style={{ width: `${uploadProgress}%`, background: '#0E676D', transition: 'width 0.2s' }} />
            </div>
          </>
        ) : (
          <>
            <div className="text-4xl mb-3">📁</div>
            <p style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '1rem', color: 'white', marginBottom: '0.4rem' }}>Glissez vos photos ici</p>
            <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>ou cliquez — JPG, PNG, WebP — max 10 Mo</p>
          </>
        )}
      </div>

      {photos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="relative group rounded-xl overflow-hidden border border-white/5 shadow-md" style={{ aspectRatio: '1', background: 'rgba(255,255,255,0.03)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt={photo.alt} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              
              {/* Bouton de suppression flottant - toujours visible */}
              <div className="absolute top-2 right-2 z-10">
                <button
                  onClick={() => handleDeletePhoto(photo)}
                  className="p-2.5 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all"
                  style={{
                    background: 'rgba(239, 68, 68, 0.95)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                  }}
                  title="Supprimer cette photo"
                  aria-label="Supprimer"
                  id={`admin-delete-photo-${photo.id}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
                  </svg>
                </button>
              </div>

              {/* Titre/alt de la photo au survol */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.75rem', color: 'white', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {photo.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Dashboard Principal ──────────────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [adminUser, setAdminUser] = useState<string | null>(null);
  const [activeModule, setActiveModule] = useState<ActiveModule>('actualites');

  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth');
    const user = sessionStorage.getItem('admin_user');
    if (auth === 'authenticated' && user) {
      setAdminUser(user);
    } else {
      router.push('/admin-bzh59');
    }
    setAuthChecked(true);
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    sessionStorage.removeItem('admin_user');
    router.push('/admin-bzh59');
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0f1117' }}>
        <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#0E676D', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  if (!adminUser) return null;

  const modules = [
    { id: 'actualites' as ActiveModule, label: 'Actualités', icon: '/icon-groupe.png', description: 'Gérer les événements & Fest-Noz' },
    { id: 'galerie' as ActiveModule, label: 'Galerie', icon: '/icon-galerie.png', description: 'Uploader des photos' },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#0f1117' }}>
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4" style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="flex items-center gap-4">
          <div className="relative h-9 w-36">
            <Image src="/logo.png" alt="Breizh Pévèle" fill className="object-contain object-left" />
          </div>
          <span className="px-2 py-0.5 rounded text-xs" style={{ background: 'rgba(14,103,109,0.3)', color: '#0E676D', fontFamily: 'var(--font-montserrat)', fontWeight: 700, letterSpacing: '0.1em' }}>
            ADMIN
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>👤 {adminUser}</span>
          <button onClick={handleLogout} className="px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors" style={{ color: 'rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontFamily: 'var(--font-montserrat)' }} id="admin-logout-btn">
            Déconnexion
          </button>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 p-4" style={{ background: 'rgba(255,255,255,0.02)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', marginBottom: '0.75rem', textTransform: 'uppercase', paddingLeft: '0.75rem' }}>
            Modules
          </p>
          <nav className="space-y-1">
            {modules.map((mod) => (
              <button key={mod.id} onClick={() => setActiveModule(mod.id)} className="w-full flex items-start gap-3 px-3 py-3 rounded-xl text-left transition-all" style={{ background: activeModule === mod.id ? 'rgba(14,103,109,0.2)' : 'transparent', border: activeModule === mod.id ? '1px solid rgba(14,103,109,0.3)' : '1px solid transparent', cursor: 'pointer' }} id={`admin-nav-${mod.id}`}>
                <div className="relative w-7 h-7 flex-shrink-0 mt-0.5">
                  <Image src={mod.icon} alt={mod.label} fill className="object-contain" />
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '0.85rem', color: activeModule === mod.id ? '#0E676D' : 'rgba(255,255,255,0.7)' }}>{mod.label}</p>
                  <p style={{ fontFamily: 'var(--font-opensans)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)' }}>{mod.description}</p>
                </div>
              </button>
            ))}
            <div style={{ paddingTop: '1rem', marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-opensans)', fontSize: '0.8rem', textDecoration: 'none' }} id="admin-view-site-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" /></svg>
                Voir le site
              </a>
            </div>
          </nav>
        </aside>

        {/* Contenu */}
        <main className="flex-1 p-8 overflow-y-auto">
          {activeModule === 'actualites' && <ActualitesModule />}
          {activeModule === 'galerie' && <GalerieModule />}
        </main>
      </div>
    </div>
  );
}
