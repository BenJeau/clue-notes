package com.cluenotes;

import android.os.Bundle;
import androidx.annotation.Nullable;
import com.reactnativenavigation.NavigationActivity;

public class MainActivity extends NavigationActivity {
  @Override
  protected void onCreate(@Nullable Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.background_splash);
  }
}
