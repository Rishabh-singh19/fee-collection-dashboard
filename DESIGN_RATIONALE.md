# Fee Collection Screen — Design Rationale

## 1. Visual hierarchy

Top of the screen is intentionally devoted to the collection summary, not the student table. The first thing Lakshmi should see is:

- Total billed this term
- Total collected so far
- Total outstanding
- Total overdue

This matches the brief: her first question is “what’s the total outstanding right now?” and the overdue amount should be findable in two seconds.

Below the summary lives the action panel:

- Search bar for student, admission number, or guardian
- Status filter for overdue / partially paid / payment failed / instalment plan / credit / withdrawn
- Class filter for quick cohort narrowing
- Sort menu for name / outstanding / status
- Reset button to clear the view

These controls are placed before the list so the interaction path is obvious: filter, then act.

The student table sits underneath as the work surface. Each row shows only the highest-value fields:

- student name + admission number
- class / section / roll
- billed / paid / balance
- status badge
- view details action

The table is deliberately lighter than the summary and filter controls, because Lakshmi should only scan the row-level data after the top-level picture is clear.

## 2. Interaction path to chase thirty defaulters

Core flow: open screen → filter to overdue → select all → send reminders.

Click count:

1. Open dashboard (0 clicks)
2. Select `Overdue` from status filter (1 click)
3. Select all filtered rows (1 click)
4. Click `Send remainder to all filtered` (1 click)

Total: 3 clicks.

If Lakshmi wants to chase a subset on the current page:

1. Search / filter to narrow down
2. Click row checkboxes for selected students
3. Click `Send remainder to selected`

The list supports keyboard focus states, and bulk actions are available without opening a student detail panel.

## 3. Awkward records and naming decisions

### Full scholarship with partial transport balance

- Student: `Devansh Patil`
- Shown as `Outstanding` because transport still owes money, with a note in details that tuition is waived.
- This avoids treating the whole account like a paid account.

### Siblings in the same family

- `Rhea Fernandes` and `Ryan Fernandes` share `familyId`.
- The reminder action message reports both student count and household count, so Lazhmi can see that she is chasing one family rather than two identical rows.

### Bounced cheque / payment failed

- `Kavya Reddy` is labeled `Payment failed` instead of generic `Overdue`.
- The row detail includes a short failure state so it is visible without opening the full history.

### Credit balance

- `Zoya` is not shown as neutral or paid.
- Balance appears as `Credit` with a green label so this family is treated differently from a cleared account.

### Instalment plan not overdue yet

- `Ishaan Nair` appears as `Instalment plan`.
- The row detail shows the next instalment date, making it clear that the account is active and not urgent.

## 4. Mobile decisions

Mobile is not just a squeezed desktop view. The phone card layout surfaces the same key signals while dropping lower-priority fields:

- Student name, class, roll, status, billed, paid, balance.
- The desktop-only table columns are replaced with a compact card that remains tappable and keyboard-accessible.
- The bulk selection checkbox remains visible on each card.

What was dropped on mobile:

- The separate `Action` button is not necessary because tapping a card opens details.
- Extra row metadata such as admissions number is kept only where it fits in the card.

## 5. One thing tried and rejected

I tried making the desktop list a full 15-field grid with all fee components visible in the row. It was rejected because it made the screen noisy and increased scan cost. The chosen design shows the critical overdue signals first, with component detail reserved for the student detail panel.

## 6. Implementation notes

- Data is loaded from `src/data/fee-data.json` with a real fetch path so the app supports loading and error states.
- The student detail panel is reachable from each row and includes payment history, notes, family information, and instalment/refund details.
- `StatusBadge` labels are intentionally distinct for edge cases such as `Payment failed`, `Credit balance`, and `Instalment plan`.
- Bulk reminder actions are available for selected students and for all filtered results.

## 7. Running the app

From the project root:

```bash
npm install
npm run dev
```

Then open the app at the Vite local URL.
