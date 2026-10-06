import { ExecutiveId, StageId, ValidationFinding, ExecutiveReview } from './types';

export interface ReworkTicket {
  ticketId: string;
  stageId: StageId;
  executiveId: ExecutiveId;
  finding: ValidationFinding;
  resolved: boolean;
  resolutionNotes?: string;
  createdAt: string;
}

export class ReworkManager {
  private static tickets: Map<string, ReworkTicket> = new Map();

  public static createIssues(stageId: StageId, reviews: ExecutiveReview[]): ReworkTicket[] {
    const created: ReworkTicket[] = [];
    const timestamp = new Date().toISOString();

    reviews.forEach((review) => {
      if (review.decision === 'NEEDS_CHANGES') {
        review.findings.forEach((finding) => {
          if (finding.blocking) {
            const ticketId = `ticket-${stageId}-${review.executiveId}-${finding.id}`;
            const ticket: ReworkTicket = {
              ticketId,
              stageId,
              executiveId: review.executiveId,
              finding,
              resolved: false,
              createdAt: timestamp
            };
            this.tickets.set(ticketId, ticket);
            created.push(ticket);
          }
        });
      }
    });

    return created;
  }

  public static getTicketsForStage(stageId: StageId): ReworkTicket[] {
    const results: ReworkTicket[] = [];
    this.tickets.forEach((t) => {
      if (t.stageId === stageId) {
        results.push(t);
      }
    });
    return results;
  }

  public static resolveTicket(ticketId: string, notes?: string): void {
    const ticket = this.tickets.get(ticketId);
    if (ticket) {
      ticket.resolved = true;
      ticket.resolutionNotes = notes || 'Resolved by user edit.';
    }
  }

  public static getAffectedExecutives(stageId: StageId): ExecutiveId[] {
    const list: ExecutiveId[] = [];
    this.tickets.forEach((t) => {
      if (t.stageId === stageId && !t.resolved) {
        if (!list.includes(t.executiveId)) {
          list.push(t.executiveId);
        }
      }
    });
    return list;
  }

  public static clearTickets(stageId: StageId): void {
    const toDelete: string[] = [];
    this.tickets.forEach((t, id) => {
      if (t.stageId === stageId) {
        toDelete.push(id);
      }
    });
    toDelete.forEach((id) => this.tickets.delete(id));
  }
}
