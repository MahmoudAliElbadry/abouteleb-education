import type { AuditEvent, AuthRepository } from './auth.repository.js';

export class AuditService {
  constructor(private readonly repository: AuthRepository) {}

  async record(event: AuditEvent) {
    await this.repository.createAuditEvent(event);
  }
}
