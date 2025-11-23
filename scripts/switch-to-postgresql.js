#!/usr/bin/env node

/**
 * SQLite'den PostgreSQL'e geçiş script'i
 * 
 * Kullanım:
 * node scripts/switch-to-postgresql.js
 */

const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');
const productionSchemaPath = path.join(__dirname, '..', 'prisma', 'schema.production.prisma');

console.log('🔄 PostgreSQL schema'ya geçiş yapılıyor...');

try {
  // Production schema'yı oku
  const productionSchema = fs.readFileSync(productionSchemaPath, 'utf8');
  
  // Mevcut schema'yı yedekle
  const currentSchema = fs.readFileSync(schemaPath, 'utf8');
  const backupPath = path.join(__dirname, '..', 'prisma', 'schema.sqlite.backup');
  fs.writeFileSync(backupPath, currentSchema);
  console.log('✅ Mevcut schema yedeklendi: prisma/schema.sqlite.backup');
  
  // Production schema'yı yaz
  fs.writeFileSync(schemaPath, productionSchema);
  console.log('✅ Schema PostgreSQL için güncellendi');
  
  console.log('\n📝 Sonraki adımlar:');
  console.log('1. DATABASE_URL environment variable\'ını PostgreSQL connection string olarak ayarlayın');
  console.log('2. npx prisma generate');
  console.log('3. npx prisma migrate dev --name init');
  console.log('4. npm run seed (opsiyonel)');
  
} catch (error) {
  console.error('❌ Hata:', error.message);
  process.exit(1);
}

