import { PrismaClient, SessionStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('📦 Seeding test account...');

  const TEST_EMAIL = 'test@test.test';
  const TEST_PASSWORD = 'testtest';
  const passwordHash = await bcrypt.hash(TEST_PASSWORD, 10);

  // Create or update test user
  const testUser = await prisma.user.upsert({
    where: { email: TEST_EMAIL },
    update: { passwordHash, firstName: 'Marie', lastName: 'Dupont', isPremium: true },
    create: {
      email: TEST_EMAIL,
      passwordHash,
      firstName: 'Marie',
      lastName: 'Dupont',
      role: 'PRACTITIONER',
      isPremium: true,
      emailVerified: new Date(),
    },
  });
  console.log(`  ✓ User: ${TEST_EMAIL} / ${TEST_PASSWORD}`);

  // Profile with favorite scales
  await prisma.profile.upsert({
    where: { userId: testUser.id },
    update: { favoriteScales: ['traumatismes-pcl5', 'index-symptomes-ybocs', 'echelle-d-anxiete-sociale-de-liebowitz'] },
    create: {
      userId: testUser.id,
      favoriteScales: ['traumatismes-pcl5', 'index-symptomes-ybocs', 'echelle-d-anxiete-sociale-de-liebowitz'],
      preferences: { theme: 'light', notifications: true },
    },
  });
  console.log('  ✓ Profile with favorite scales');

  // Create patients
  const patientsData = [
    { firstName: 'Lucas', lastName: 'Martin', email: 'lucas.martin@email.com', birthDate: new Date('1990-03-15'), notes: 'Suivi anxiété sociale depuis janvier 2026. Progrès notables.' },
    { firstName: 'Emma', lastName: 'Bernard', email: 'emma.bernard@email.com', birthDate: new Date('1985-07-22'), notes: 'Dépression modérée. Thérapie cognitive en cours.' },
    { firstName: 'Hugo', lastName: 'Petit', email: 'hugo.petit@email.com', birthDate: new Date('1998-11-03'), notes: 'TSPT suite accident. Début de prise en charge.' },
    { firstName: 'Chloé', lastName: 'Robert', email: 'chloe.robert@email.com', birthDate: new Date('1978-01-30'), notes: 'TOC - rituels de vérification. Sous traitement.' },
    { firstName: 'Théo', lastName: 'Richard', email: 'theo.richard@email.com', birthDate: null, notes: null },
    { firstName: 'Léa', lastName: 'Moreau', email: 'lea.moreau@email.com', birthDate: new Date('2001-09-12'), notes: 'Anxiété de performance. Étudiante en médecine.' },
  ];

  const patients: Record<string, any> = {};
  for (const p of patientsData) {
    const patient = await prisma.patient.upsert({
      where: { practitionerId_email: { practitionerId: testUser.id, email: p.email } },
      update: { firstName: p.firstName, lastName: p.lastName, birthDate: p.birthDate, notes: p.notes },
      create: { ...p, practitionerId: testUser.id },
    });
    patients[p.firstName] = patient;
    console.log(`  ✓ Patient: ${p.firstName} ${p.lastName}`);
  }

  // Archive one patient (Théo - no data)
  await prisma.patient.update({
    where: { id: patients['Théo'].id },
    data: { archivedAt: new Date('2026-01-15') },
  });
  console.log('  ✓ Archived patient: Théo Richard');

  // Helper to create sessions
  const now = new Date();
  const daysAgo = (d: number) => new Date(now.getTime() - d * 86400000);

  // Delete existing sessions for test user to avoid duplicates
  await prisma.session.deleteMany({ where: { practitionerId: testUser.id } });

  // ---- SESSIONS ----
  const sessionsData = [
    // Lucas - Liebowitz: completed sessions showing improvement over time
    {
      scaleId: 'echelle-d-anxiete-sociale-de-liebowitz',
      patientId: patients['Lucas'].id,
      status: SessionStatus.COMPLETED,
      sentAt: daysAgo(90),
      startedAt: daysAgo(89),
      completedAt: daysAgo(89),
      responses: JSON.stringify({ answers: Array.from({ length: 24 }, (_, i) => ({ questionId: i + 1, anxiety: 2, avoidance: 2 })) }),
      score: JSON.stringify({
        totalScore: 96,
        maxScore: 144,
        interpretation: 'Anxiété sociale sévère',
        severityIndex: 3,
        severityRangeCount: 4,
        subscores: [
          { key: 'anxiety', label: 'Anxiété', value: 48, max: 72 },
          { key: 'avoidance', label: 'Évitement', value: 48, max: 72 },
        ],
      }),
      interpretation: 'Anxiété sociale sévère',
    },
    {
      scaleId: 'echelle-d-anxiete-sociale-de-liebowitz',
      patientId: patients['Lucas'].id,
      status: SessionStatus.COMPLETED,
      sentAt: daysAgo(30),
      startedAt: daysAgo(29),
      completedAt: daysAgo(29),
      responses: JSON.stringify({ answers: Array.from({ length: 24 }, (_, i) => ({ questionId: i + 1, anxiety: 1, avoidance: 1 })) }),
      score: JSON.stringify({
        totalScore: 48,
        maxScore: 144,
        interpretation: 'Anxiété sociale légère',
        severityIndex: 0,
        severityRangeCount: 4,
        subscores: [
          { key: 'anxiety', label: 'Anxiété', value: 24, max: 72 },
          { key: 'avoidance', label: 'Évitement', value: 24, max: 72 },
        ],
      }),
      interpretation: 'Anxiété sociale légère',
    },
    // Hugo - PCL-5 completed
    {
      scaleId: 'traumatismes-pcl5',
      patientId: patients['Hugo'].id,
      status: SessionStatus.COMPLETED,
      sentAt: daysAgo(7),
      startedAt: daysAgo(6),
      completedAt: daysAgo(6),
      responses: JSON.stringify({ answers: Array.from({ length: 20 }, (_, i) => ({ questionId: i + 1, value: 3 })) }),
      score: JSON.stringify({
        totalScore: 60,
        maxScore: 80,
        interpretation: 'Présence éventuelle d\'un trouble de stress post-traumatique',
        severityIndex: 1,
        severityRangeCount: 2,
        subscores: [
          { key: 'cluster-b', label: 'Intrusions (B)', value: 15, max: 20 },
          { key: 'cluster-c', label: 'Évitement (C)', value: 6, max: 8 },
          { key: 'cluster-d', label: 'Cognitions et humeur (D)', value: 21, max: 28 },
          { key: 'cluster-e', label: 'Hyperéveil (E)', value: 18, max: 24 },
        ],
      }),
      interpretation: 'Présence éventuelle d\'un trouble de stress post-traumatique',
      patientComments: 'J\'ai eu du mal à répondre aux questions sur les cauchemars.',
    },

    // Chloé - Y-BOCS completed
    {
      scaleId: 'index-symptomes-ybocs',
      patientId: patients['Chloé'].id,
      status: SessionStatus.COMPLETED,
      sentAt: daysAgo(21),
      startedAt: daysAgo(20),
      completedAt: daysAgo(20),
      responses: JSON.stringify({ answers: Array.from({ length: 10 }, (_, i) => ({ questionId: i + 1, value: 3 })) }),
      score: JSON.stringify({
        totalScore: 30,
        maxScore: 40,
        interpretation: 'TOC sévère',
        severityIndex: 3,
        severityRangeCount: 5,
        subscores: [
          { key: 'obsessions', label: 'Obsessions', value: 15, max: 20 },
          { key: 'compulsions', label: 'Compulsions', value: 15, max: 20 },
        ],
      }),
      interpretation: 'TOC sévère',
    },

    // Hugo - Liebowitz: expired
    {
      scaleId: 'echelle-d-anxiete-sociale-de-liebowitz',
      patientId: patients['Hugo'].id,
      status: SessionStatus.EXPIRED,
      sentAt: daysAgo(30),
      expiresAt: daysAgo(23),
    },

    // Emma - PCL-5: cancelled
    {
      scaleId: 'traumatismes-pcl5',
      patientId: patients['Emma'].id,
      status: SessionStatus.CANCELLED,
      sentAt: daysAgo(10),
      createdAt: daysAgo(10),
    },

  ];

  for (const s of sessionsData) {
    await prisma.session.create({
      data: { ...s, practitionerId: testUser.id },
    });
  }
  console.log(`  ✓ ${sessionsData.length} sessions (all statuses)`);

  // ---- EMAIL LOGS ----
  await prisma.emailLog.createMany({
    data: [
      { to: 'lucas.martin@email.com', from: 'noreply@melya.app', subject: 'Questionnaire à compléter - Liebowitz', sessionId: null, status: 'sent', provider: 'resend', sentAt: daysAgo(90) },
      { to: 'hugo.petit@email.com', from: 'noreply@melya.app', subject: 'Questionnaire à compléter - PCL-5', sessionId: null, status: 'sent', provider: 'resend', sentAt: daysAgo(7) },
    ],
  });
  console.log('  ✓ Email logs (sent + failed)');

  // ---- AUDIT LOGS ----
  await prisma.auditLog.createMany({
    data: [
      { userId: testUser.id, action: 'USER_LOGIN', resource: 'User', resourceId: testUser.id, ipAddress: '127.0.0.1', userAgent: 'Mozilla/5.0', timestamp: daysAgo(1) },
      { userId: testUser.id, action: 'PATIENT_CREATED', resource: 'Patient', resourceId: patients['Lucas'].id, metadata: { firstName: 'Lucas', lastName: 'Martin' }, timestamp: daysAgo(90) },
      { userId: testUser.id, action: 'SESSION_CREATED', resource: 'Session', metadata: { scaleId: 'traumatismes-pcl5', patientName: 'Hugo Petit' }, timestamp: daysAgo(7) },
      { userId: testUser.id, action: 'DATA_ACCESSED', resource: 'Session', metadata: { action: 'view_results' }, timestamp: daysAgo(5) },
      { userId: testUser.id, action: 'PATIENT_ARCHIVED', resource: 'Patient', resourceId: patients['Théo'].id, timestamp: daysAgo(30) },
    ],
  });
  console.log('  ✓ Audit logs');

  console.log('\n✅ Seeding complete!');
  console.log(`\n🔑 Test account: ${TEST_EMAIL} / ${TEST_PASSWORD}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
