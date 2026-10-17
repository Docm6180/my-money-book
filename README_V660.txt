MyMoney V6.6.0 portable backup test

Based on uploaded V6.5.0 test version. New v660.js adds complete JSON export and preview/restore for ledger, transaction templates, and recurring bill reminders. The existing ledger localStorage key and finance calculations are unchanged. Old ledger-only JSON backups are accepted (templates and bills become empty after restore). PIN and settings are intentionally excluded.

IMPORTANT: Restore overwrites ledger, templates and recurring reminders after two confirmations and attempts to download a protective backup first. Browser-triggered download cannot prove the user has saved the file: always export and verify a separate JSON backup before testing restore. Browser localStorage and local snapshots are not off-device backups. Test with fake records on the test site only. Do not upload private JSON backups to public GitHub.
