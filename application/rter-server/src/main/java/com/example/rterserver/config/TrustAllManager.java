package com.example.rterserver.config;

import javax.net.ssl.X509TrustManager;
import java.security.cert.X509Certificate;

/**
 * This class is used to trust all certificates.
 */

public class TrustAllManager implements X509TrustManager {
    public void checkClientTrusted(X509Certificate[] chain, String authType) {
    }

    public void checkServerTrusted(X509Certificate[] chain, String authType) {
    }

    public X509Certificate[] getAcceptedIssuers() {
        return new X509Certificate[0];
    }
}
