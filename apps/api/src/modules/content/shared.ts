import type { Prisma, PrismaClient } from '@prisma/client';
import { appErrors } from '../../core/app-error.js';

type AuditClient = Pick<PrismaClient, 'auditLog'>;

export function pathParam(value: string | string[] | undefined) {
  if (typeof value !== 'string') throw appErrors.notFound();
  return value;
}

export function audit(
  prisma: AuditClient,
  action: string,
  entityType: string,
  entityId: string,
  actorUserId: string,
  ipAddress?: string,
) {
  return prisma.auditLog.create({
    data: { actorUserId, action, entityType, entityId, ipAddress: ipAddress ?? null },
  });
}

type PageableModel = {
  findMany(args: object): Prisma.PrismaPromise<unknown>;
  count(args: object): Prisma.PrismaPromise<number>;
};
export async function listAdminPage(
  prisma: Pick<PrismaClient, '$transaction'>,
  model: PageableModel,
  where: object,
  orderBy: object | object[],
  page: number,
  pageSize: number,
  select: object,
) {
  const [items, total] = await prisma.$transaction([
    model.findMany({ where, orderBy, skip: (page - 1) * pageSize, take: pageSize, select }),
    model.count({ where }),
  ] as [Prisma.PrismaPromise<unknown>, Prisma.PrismaPromise<number>]);
  return { items, total, page, pageSize };
}
