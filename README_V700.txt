MyMoney V7.0.0 — Release Candidate (RC1)

Based on the V6.9.0 ZIP provided by the user, after the user's 8/8 mobile checks.
This is a candidate, not yet approved for production.

Changes:
- Refresh version labels for the read-only release checks.
- Refresh cache-busting query strings and PWA cache version.
- Preserve all existing storage keys, ledger format, application functionality, and JSON backup format.
- No automatic migration, clearing, or overwriting of browser data.

Deployment:
1. Export a COMPLETE private JSON backup from the test site and verify the downloaded file exists.
2. Upload these files ONLY to the separate my-money-v6-test repository first.
3. Test PIN, balances, debts, recurring bills, backup/restore with test data, offline operation, and all three languages.
4. Do not replace V5.8 production until tests pass and a migration/rollback plan is confirmed.
5. Never upload private finance JSON backups to public GitHub.

NOTE: Passing syntax and archive checks does not establish production readiness or guarantee data safety.
