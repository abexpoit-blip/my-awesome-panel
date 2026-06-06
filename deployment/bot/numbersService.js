const db = require('./db');

/**
 * Updates an allocation to record that an OTP was received.
 * Billed means it's a new OTP that triggers a payment charge to the agent.
 */
async function markOtpReceived({ 
  allocation_id, 
  otp_code, 
  sms_text = null, 
  is_billed = true, 
  is_fake = false 
}) {
  if (!allocation_id) return null;

  try {
    const now = Math.floor(Date.now() / 1000);
    
    // 1. Update the allocation status
    const status = is_billed ? 'received' : 'active'; // stay active if it's just a duplicate/resend? 
    // Usually 'received' if we got the OTP.
    
    await db.prepare(`
      UPDATE allocations 
      SET status = 'received',
          otp_code = ?,
          sms_text = ?,
          otp_received_at = ?,
          updated_at = ?
      WHERE id = ?
    `).run(otp_code, sms_text, now, now, allocation_id);

    // 2. If billed, we might need to deduct balance or create a transaction,
    // but the bot usually just marks it; the system handles the rest.
    
    return true;
  } catch (e) {
    console.error('[numbers-service] markOtpReceived failed:', e.message);
    return false;
  }
}

module.exports = { markOtpReceived };
