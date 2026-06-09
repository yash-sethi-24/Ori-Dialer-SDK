# @ori-serve/dialer-sdk

Official SDK for Oriserve Dialer Service.

```bash
npm install @ori-serve/dialer-sdk
```

## Setup

```typescript
import OriDialer from '@ori-serve/dialer-sdk';

const sdk = new OriDialer({
    username: 'your-email',
    password: 'your-password',
    dialerBaseURL: '...',      // optional, defaults to 'https://dialer.oriserve.com'
    dashboardBaseURL: '...',   // optional, defaults to 'https://api.dialer.oriserve.com'
    timeout: 30000,            // optional
    workspaceId: 'workspace-id' // optional
});

```

---

## Dialer

### Initiate Call

```typescript
const response = await sdk.initiateCall({
    userPhoneNumber: '+1234567890',
    botPhoneNumber: '+0987654321',
    websocketUrlForMediaStream: 'wss://your-media-server.com',
    webhookUrlForCallEvents: 'https://your-server.com/webhook',
    callId: 'custom-call-id', // optional, auto-generated if not provided
    maxCallDuration: 900,     // optional, max 3600
    additionalDetails: {},    // optional
});
```

> `websocketUrlForMediaStream` and `webhookUrlForCallEvents` are required for outbound calls to have audio.

### Hangup

```typescript
await sdk.hangup(callId);
```

### Webhook Events

```typescript
{ callId: string, eventName: 'CALL_START' | 'CALL_TERMINATE' }
```

---

## Dashboard

### Phone Numbers

```typescript
sdk.phoneNumbers.list({ skip: 0, limit: 20 })
sdk.phoneNumbers.available({ skip: 0, limit: 20, location: 'Banglore', includeMultiRent: true })
sdk.phoneNumbers.rent({ phoneNumber, reason, description, applicationId? })
sdk.phoneNumbers.unrent({ phoneNumber })
```

### Sessions

```typescript
sdk.sessions.list({ skip, limit, status?, startDate?, endDate?, ... })
sdk.sessions.get(callId)
sdk.sessions.export({ startDate, endDate })           // returns Buffer
sdk.sessions.downloadRecording(callId)                 // returns Buffer
```

### Applications

```typescript
sdk.applications.list({ skip?, limit? })
sdk.applications.get(id)
sdk.applications.create({ name, primaryUrl, fallbackUrl? })
sdk.applications.update(id, { name?, primaryUrl?, fallbackUrl? })
sdk.applications.delete(id)
```

### Workspaces

```typescript
sdk.workspaces.list({ skip?, limit? })
sdk.workspaces.select(workspaceId)    // auto-updates workspace header
```

### Overview

```typescript
sdk.overview.get({ timezone?, startDate?, endDate?, applicationId? })
```

### Users

```typescript
sdk.users.list({ skip?, limit? })
sdk.users.create({ firstName, lastName, email, password, username?, roleKey?, permissions? }) // roleKey: 'admin' | 'manager' | 'agent' | 'custom' | 'sdk-user'
sdk.users.update(userId, { firstName?, lastName?, username?, roleKey?, permissions? })
sdk.users.delete(userId)
```

### Services

```typescript
sdk.services.status(serviceType, id)
sdk.services.createIncident(serviceType, id, { title, status, description? })
sdk.services.updateIncident(incidentId, { message, status? })
sdk.services.resolveIncident(incidentId, resolutionMessage)
```

### Trunks

```typescript
sdk.trunks.live()
sdk.trunks.updateCps(id, cpsCapacityInPercent)   // 3-8
```

### Public Status (no auth required)

```typescript
sdk.publicStatus.live(serviceType, { skip?, limit? })
sdk.publicStatus.uptime(serviceType, id, days?)
sdk.publicStatus.incidents(serviceType, id, { skip?, limit? })
```

### Public Notifications (no auth required)

```typescript
sdk.publicNotifications.otpRequest({ email, type })
sdk.publicNotifications.subscribe({ email, otp })
sdk.publicNotifications.unsubscribeRequest(email)
```

---

## Error Handling

```typescript
try {
    await sdk.users.create({ ... });
} catch (error) {
    error.message   // User-friendly message
    error.status    // Status code from response body
    error.code      // API error code
    error.data      // Additional details
}
```

---

## TypeScript

All types are exported:

```typescript
import OriDialer, {
    OriDialerConfig,
    InitiateCallParams,
    CallEvent,
    // ...
} from '@ori-serve/dialer-sdk';
```
