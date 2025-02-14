import { supabase } from './supabase';

async function getClientIp(): Promise<string> {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error getting client IP:', error);
    return 'unknown';
  }
}

export async function trackResourceView(resourceId: string) {
  if (!resourceId) return;
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    const clientIp = await getClientIp();
    
    // Insert view record
    const { error: insertError } = await supabase
      .from('resource_views')
      .insert([
        {
          resource_id: resourceId,
          user_id: user?.id || null,
          viewed_at: new Date().toISOString(),
          client_ip: clientIp,
        },
      ]);

    if (insertError) {
      console.error('Error inserting view:', insertError);
      return;
    }

    // Increment views count using the correct parameter names
    const { error: updateError } = await supabase.rpc('increment_resource_views', {
      p_resource_id: resourceId,
      p_client_ip: clientIp,
    });

    if (updateError) {
      console.error('Error incrementing views:', updateError);
    }
  } catch (error) {
    console.error('Error tracking resource view:', error);
  }
}

export async function trackResourceClick(resourceId: string) {
  if (!resourceId) return;

  try {
    const { data: { user } } = await supabase.auth.getUser();
    const clientIp = await getClientIp();
    
    // Insert click record
    const { error: insertError } = await supabase
      .from('resource_clicks')
      .insert([
        {
          resource_id: resourceId,
          user_id: user?.id || null,
          clicked_at: new Date().toISOString(),
          source: window.location.pathname,
          client_ip: clientIp,
        },
      ]);

    if (insertError) {
      console.error('Error inserting click:', insertError);
      return;
    }

    // Increment clicks count using the correct parameter names
    const { error: updateError } = await supabase.rpc('increment_resource_clicks', {
      p_resource_id: resourceId,
      p_client_ip: clientIp,
    });

    if (updateError) {
      console.error('Error incrementing clicks:', updateError);
    }
  } catch (error) {
    console.error('Error tracking resource click:', error);
  }
}