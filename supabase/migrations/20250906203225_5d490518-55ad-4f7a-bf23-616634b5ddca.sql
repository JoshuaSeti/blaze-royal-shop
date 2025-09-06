-- Update the handle_new_user function to support vendor fields
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email, is_vendor, vendor_company_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.email,
    COALESCE((NEW.raw_user_meta_data ->> 'is_vendor')::boolean, false),
    NEW.raw_user_meta_data ->> 'vendor_company_name'
  );
  RETURN NEW;
END;
$$;