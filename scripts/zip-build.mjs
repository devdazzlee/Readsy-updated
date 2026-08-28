// Runs automatically after every `npm run build` (see package.json's
// "postbuild" script). Zips the fresh out/ folder into a single file ready
// to upload to Hostinger's File Manager (which can extract a zip directly —
// much faster than uploading hundreds of files one by one over FTP), and
// deletes whatever zip was left over from the previous build first, so
// there's always exactly one, current one — never a pile of stale ones.
import { createWriteStream, existsSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ZipArchive } from "archiver";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(projectRoot, "out");
const zipPath = join(projectRoot, "out.zip");

async function main() {
  if (!existsSync(outDir)) {
    console.error('zip-build: "out/" folder not found — did the build actually run first?');
    process.exit(1);
  }

  if (existsSync(zipPath)) {
    rmSync(zipPath);
    console.log("zip-build: removed previous out.zip");
  }

  await new Promise((resolve, reject) => {
    const output = createWriteStream(zipPath);
    const archive = new ZipArchive({ zlib: { level: 9 } });

    output.on("close", resolve);
    archive.on("warning", (err) => console.warn("zip-build warning:", err.message));
    archive.on("error", reject);

    archive.pipe(output);
    // Zip the *contents* of out/ at the archive root (not out/ itself as a
    // nested folder) — so extracting on Hostinger drops files straight into
    // public_html instead of into an extra out/ subfolder.
    archive.directory(outDir, false);
    archive.finalize();
  });

  console.log("zip-build: created out.zip, ready to upload to Hostinger.");
}

main().catch((err) => {
  console.error("zip-build failed:", err);
  process.exit(1);
});
