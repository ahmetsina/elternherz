# Cal.com Embedding Components

This project includes three Cal.com embedding components following the official Cal.com documentation: https://cal.com/help/embedding/adding-embed

## Components Overview

### 1. CalComWidget.astro (Legacy)
The original inline embedding component, still functional and in use.

**Location:** `src/components/CalComWidget.astro`

**Usage:**
```astro
<CalComWidget calLink="elternherz/erstgesprach" locale="de" />
```

**Props:**
- `calLink` (required): Cal.com link in format "username/event-type"
- `locale`: "de" | "tr" (default: "de")

### 2. BookingWidget.astro (Legacy)
Enhanced booking widget component with better error handling.

**Location:** `src/components/BookingWidget.astro`

**Usage:**
```astro
<BookingWidget eventType="erstgesprach" lang="de" />
```

**Props:**
- `eventType`: Event type name (default: "erstgesprach")
- `lang`: "de" | "tr" (default: "de")

### 3. CalEmbed.astro (New - Recommended)
Unified component supporting both inline and floating-popup embed types.

**Location:** `src/components/CalEmbed.astro`

**Usage:**

**Inline Embed:**
```astro
<CalEmbed 
  calLink="elternherz/erstgesprach" 
  type="inline"
  locale="de"
  layout="month_view"
/>
```

**Floating Popup:**
```astro
<CalEmbed 
  calLink="elternherz/erstgesprach" 
  type="floating-popup"
  locale="de"
  buttonText="Jetzt Termin buchen"
  buttonColor="#3498db"
  buttonTextColor="#ffffff"
/>
```

**Props:**
- `calLink` (required): Cal.com link in format "username/event-type"
- `type`: "inline" | "floating-popup" (default: "inline")
- `locale`: "de" | "tr" (default: "de")
- `buttonText`: Custom text for floating button
- `buttonColor`: Background color for floating button (default: "#3498db")
- `buttonTextColor`: Text color for floating button (default: "#ffffff")
- `layout`: "month_view" | "week_view" | "column_view" (default: "month_view")

### 4. CalComFloatingButton.astro (New)
Dedicated component for creating floating popup buttons.

**Location:** `src/components/CalComFloatingButton.astro`

**Usage:**
```astro
<CalComFloatingButton 
  calLink="elternherz/einzelberatung" 
  buttonText="Einzelberatung buchen"
  locale="de"
  buttonColor="#e74c3c"
  buttonTextColor="#ffffff"
/>
```

**Props:**
- `calLink` (required): Cal.com link in format "username/event-type"
- `buttonText`: Custom button text
- `locale`: "de" | "tr" (default: "de")
- `buttonColor`: Button background color (default: "#3498db")
- `buttonTextColor`: Button text color (default: "#ffffff")

## Implementation Details

### Embed Script
All components load the Cal.com embed script from:
```
https://app.cal.com/embed/embed.js
```

### Initialization
Components follow the official Cal.com initialization pattern:
```javascript
Cal("init");
```

### Embed Types

**Inline Embeds:**
```javascript
Cal("inline", {
  elementOrSelector: "#element-id",
  calLink: "username/event-type",
  namespace: "unique-namespace",
  config: { theme: 'light', layout: 'month_view' }
});
```

**Floating Buttons:**
```javascript
Cal("floatingButton", {
  calLink: "username/event-type",
  namespace: "unique-namespace",
  config: {
    name: "Book Now",
    buttonText: "Book Now",
    buttonColor: "#3498db",
    buttonTextColor: "#ffffff"
  }
});
```

### Namespaces
Each embed instance uses a unique namespace (derived from the calLink) to ensure proper isolation when multiple embeds are on the same page.

## Configuration

### Environment Variables
Set in `.env` or Cloudflare Pages environment variables:

```env
PUBLIC_CALCOM_USERNAME=elternherz
PUBLIC_CALCOM_URL=https://cal.eu
```

### Event Types
The following event types should be configured in your Cal.com dashboard:
- `erstgesprach` - Free Initial Consultation (30 min, free)
- `einzelberatung` - Individual Counseling (60 min, 75€)
- `paarberatung` - Couples Counseling (90 min, 110€)
- `folgetermin` - Follow-up Session (45 min, 60€)

## Testing

A test page is available at `/embed-test/` to demonstrate both embed types.

### Manual Testing
1. Start dev server: `npm run dev`
2. Visit: http://localhost:4321/embed-test/
3. Verify inline embed loads correctly
4. Verify floating button appears in bottom-right corner

**Note:** During development, browser extensions (ad blockers) may block the Cal.com embed script. This is expected and will not occur in production.

## Troubleshooting

### Embed Not Loading
1. Check browser console for errors
2. Verify `PUBLIC_CALCOM_USERNAME` environment variable is set
3. Ensure Cal.com event types are published and public
4. Disable ad blockers/privacy extensions during testing
5. Test the direct Cal.com link: `https://cal.eu/[username]/[event-type]`

### Loading Spinner Doesn't Hide
- The loading spinner hides after 2 seconds by default
- If embed fails to load, an error message will be shown instead
- Check browser console for JavaScript errors

### Multiple Embeds on Same Page
- Each embed uses a unique namespace to prevent conflicts
- Multiple inline embeds work correctly
- Multiple floating buttons will all appear (consider using only one)

## Migration Guide

### From CalComWidget to CalEmbed (Inline)
**Before:**
```astro
<CalComWidget calLink="elternherz/erstgesprach" locale="de" />
```

**After:**
```astro
<CalEmbed calLink="elternherz/erstgesprach" type="inline" locale="de" />
```

### From BookingWidget to CalEmbed (Inline)
**Before:**
```astro
<BookingWidget eventType="erstgesprach" lang="de" />
```

**After:**
```astro
<CalEmbed calLink="elternherz/erstgesprach" type="inline" locale="de" />
```

## Best Practices

1. **Use CalEmbed for new implementations** - It's the most flexible and up-to-date
2. **One floating button per page** - Multiple floating buttons can overlap
3. **Test in production environment** - Dev server may have script blocking issues
4. **Set appropriate loading timeout** - Adjust based on your network conditions
5. **Provide fallback contact options** - Always offer alternative ways to book (contact form, email, phone)

## Resources

- [Cal.com Embedding Documentation](https://cal.com/help/embedding/adding-embed)
- [Cal.com API Reference](https://cal.com/docs/api-reference)
- [Cal.com Support](https://cal.com/support)

## Changelog

### 2026-01-28
- Fixed Cal.com embed initialization to follow official documentation
- Changed embed script URL from `app.cal.eu` to `app.cal.com`
- Simplified initialization pattern (removed complex namespace initialization)
- Created new `CalEmbed` component supporting both inline and floating-popup types
- Created new `CalComFloatingButton` component for floating buttons
- Updated existing `CalComWidget` and `BookingWidget` components
- Increased loading timeout from 1.5s to 2s
- Added proper namespace isolation for multiple embeds

---

*Last updated: January 28, 2026*
