# Security Specification for RoboPortfolio

## Data Invariants
- A contact message must have a valid name, email, and content.
- All messages must have a server-generated timestamp.
- Document IDs must be valid alphanumeric strings.
- Public users can only create messages; they cannot read or list them.

## The Dirty Dozen Payloads (Contact Messages)

1. **Identity Spoofing**: Attempt to set `ownerId` (not applicable here, but we check for shadow fields).
2. **Ghost Fields**: `{"name": "Attacker", "email": "a@a.com", "message": "Hi", "isAdmin": true}`.
3. **Huge Payloads**: `{"message": "A" * 1000000}`.
4. **Invalid Email**: `{"email": "not-an-email"}`.
5. **Timestamp Grafting**: `{"createdAt": "2020-01-01T00:00:00Z"}` (client-provided instead of server-provided).
6. **ID Poisoning**: Attempt to write to `/messages/../system_config`.
7. **Bypassing Creation Logic**: `{"name": "X"}` (missing required fields).
8. **Malicious ID**: Using a 1KB string as `messageId`.
9. **Unauthorized Read**: Attempting to `get` or `list` from `/messages`.
10. **Unauthorized Update**: Attempting to edit a previously submitted message.
11. **Unauthorized Delete**: Attempting to delete a message.
12. **Type Poisoning**: `{"name": true}` (boolean instead of string).

## Test Runner Logic
The `firestore.rules` must explicitly block all the above scenarios.
