/**
 * Development-only visual helpers.
 *
 * React Grab lets us hover an element and press Ctrl/Cmd+C to copy its source
 * context. React Scan adds a small toolbar for investigating re-renders.
 * This module is imported only when Vite is running in development mode.
 */
export async function enableDeveloperTools() {
  const [{ scan }] = await Promise.all([import('react-scan'), import('react-grab')]);

  scan({
    enabled: true,
    showToolbar: true,
    log: false,
  });
}
