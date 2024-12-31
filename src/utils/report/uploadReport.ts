import { supabase } from '../../lib/supabase';

export const uploadReport = async (blob: Blob, filename: string): Promise<string> => {
  try {
    const { data, error } = await supabase
      .storage
      .from('assessment-reports')
      .upload(`reports/${filename}`, blob, {
        contentType: 'application/pdf',
        upsert: true
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase
      .storage
      .from('assessment-reports')
      .getPublicUrl(`reports/${filename}`);

    return publicUrl;
  } catch (error) {
    console.error('Failed to upload report:', error);
    throw error;
  }
};