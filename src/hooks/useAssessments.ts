import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface Assessment {
  sound_power: number;
  directivity: number;
  distance: number;
  barrier: number;
  final_level: number;
}

export const useAssessments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveAssessment = async (assessment: Assessment) => {
    try {
      setLoading(true);
      setError(null);

      const { error: saveError } = await supabase
        .from('assessments')
        .insert([assessment]);

      if (saveError) throw saveError;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save assessment');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    saveAssessment
  };
};